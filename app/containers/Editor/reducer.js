import {
    EditorState,
    Modifier,
    SelectionState,
    Entity,
    CharacterMetadata,
    ContentBlock,
    genKey,
    BlockMapBuilder,
} from 'draft-js';

import * as Actions from './actions';

import { List, Repeat } from 'immutable';

const initialState = {
  editorState: EditorState.createEmpty(),
};

const removeBlock = (editorState, blockKey) => {
  let content = editorState.getCurrentContent();
  const newSelection = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 0,
  });

  const afterKey = content.getKeyAfter(blockKey);
  const afterBlock = content.getBlockForKey(afterKey);
  let targetRange = void 0;

  // Only if the following block the last with no text then the whole block
  // should be removed. Otherwise the block should be reduced to an unstyled block
  // without any characters.
  if (afterBlock && afterBlock.getType() === 'unstyled' && afterBlock.getLength() === 0 && afterBlock === content.getBlockMap().last()) {
    targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: afterKey,
      focusOffset: 0,
    });
  } else {
    targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 1,
    });
  }

  // change the blocktype and remove the characterList entry with the sticker
  content = Modifier.setBlockType(content, targetRange, 'unstyled');
  content = Modifier.removeRange(content, targetRange, 'backward');

  // force to new selection
  const newState = EditorState.push(editorState, content, 'remove-asset');
  return EditorState.forceSelection(newState, newSelection);
};

const addBlock = (editorState) => {
  const currentContentState = editorState.getCurrentContent();
  const currentSelectionState = editorState.getSelection();

  // in case text is selected it is removed and then the sticker is appended
  const afterRemovalContentState = Modifier.removeRange(currentContentState, currentSelectionState, 'backward');

  // deciding on the postion to split the text
  const targetSelection = afterRemovalContentState.getSelectionAfter();
  const blockKeyForTarget = targetSelection.get('focusKey');
  const block = currentContentState.getBlockForKey(blockKeyForTarget);
  let insertionTargetSelection = void 0;
  let insertionTargetBlock = void 0;

  // In case there are no characters or entity or the selection is at the start it
  // is safe to insert the sticker in the current block.
  // Otherwise a new block is created (the sticker is always its own block)
  const isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
  const selectedFromStart = currentSelectionState.getStartOffset() === 0;
  if (isEmptyBlock || selectedFromStart) {
    insertionTargetSelection = targetSelection;
    insertionTargetBlock = afterRemovalContentState;
  } else {
    // the only way to insert a new seems to be by splitting an existing in to two
    insertionTargetBlock = Modifier.splitBlock(afterRemovalContentState, targetSelection);

    // the position to insert our blocks
    insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
  }

  // TODO not sure why we need it …
  const newContentStateAfterSplit = Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'asset');

  // creating a new ContentBlock including the entity with data
  const entityKey = Entity.create('asset', 'IMMUTABLE', {});
  const charDataOfSticker = CharacterMetadata.create({ entity: entityKey });

  const fragmentArray = [new ContentBlock({
    key: (0, genKey)(),
    type: 'asset',
    text: '',
    characterList: (0, List)((0, Repeat)(charDataOfSticker, 1)) }),

  // new contentblock so we can continue wrting right away after inserting the sticker
  new ContentBlock({
    key: (0, genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, List)() })];

  // create fragment containing the two content blocks
  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  // replace the contentblock we reserved for our insert
  const contentStateWithSticker = Modifier.replaceWithFragment(newContentStateAfterSplit, insertionTargetSelection, fragment);

  // update editor state with our new state including the sticker
  const newState = EditorState.push(editorState, contentStateWithSticker, 'insert-asset');
  return EditorState.forceSelection(newState, contentStateWithSticker.getSelectionAfter());
};

const moveBlock = (editorState, previousBlockKey) => {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const newBlockKey = selection.editorState.getSelection();
  const block = content.getBlockForKey(previousBlockKey);

  const contentsAfterSplit = Modifier.splitBlock(content, selection);

  const newblockMap = contentsAfterSplit.getBlockMap();
  const brandNewblock = newblockMap.get(newBlockKey);
  const clonedBlock = brandNewblock.merge({
    text: block.getText(),
    type: block.getType(),
    data: block.getData(),
  });

  const veryNewContent = contentsAfterSplit.merge({
    blockMap: newblockMap.set(newBlockKey, clonedBlock),
  });

  const editorStateWithNewNewContent = EditorState.push(editorState, veryNewContent, 'split-block');

  return removeBlock(editorStateWithNewNewContent, previousBlockKey);
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case Actions.EDITOR_STATE_CHANGED:
      return {
        ...state,
        editorState: action.payload.editorState,
      };

    case Actions.ASSET_CREATED:
      // const currentEditorState = state.editorState;
      // const currentSelection = currentEditorState.getSelection();
      // const currentKey = currentSelection.getAnchorKey();
      // const currentContent = currentEditorState.getCurrentContent();

      //       // split the current block
      // const contentWithSplitBlocks = Modifier.splitBlock(currentContent, currentSelection);

      //       // turn the old block into an asset
      // const blockMap = contentWithSplitBlocks.getBlockMap();
      // const oldBlock = blockMap.get(currentKey);
      // const assetBlock = oldBlock.merge({
      //   text: '',
      //   type: 'asset',
      //   data: {},
      // });
      // const newContent = contentWithSplitBlocks.merge({
      //   blockMap: blockMap.set(currentKey, assetBlock),
      // });
      // const editorStateWithNewContent = EditorState.push(currentEditorState, newContent, 'split-block');

      //       // select the new block
      // const newKey = contentWithSplitBlocks.getKeyAfter(currentKey);
      // const editorStateWithFocus = EditorState.forceSelection(
      //           editorStateWithNewContent,
      //           new SelectionState({
      //             anchorKey: newKey,
      //             anchorOffset: 0,
      //             focusKey: newKey,
      //             focusOffset: 0,
      //           })
      //       );
      const editorStateWithFocus = addBlock(state.editorState);

      return {
        ...state,
        editorState: editorStateWithFocus,
      };
      // var editorState = state.editorState;
      //   var contentState = editorState.getCurrentContent();
      //   var selectionState = editorState.getSelection();

      //   var afterRemoval = Modifier.removeRange(
      //           contentState,
      //           selectionState,
      //           'backward'
      //   );
      //   var targetSelection = afterRemoval.getSelectionAfter();
      //   var afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
      //   var insertionTarget = afterSplit.getSelectionAfter();

      //   var asMedia = Modifier.setBlockType(afterSplit, insertionTarget, 'asset');

      // return {
      //   ...state,
      //   editorState: EditorState.push(editorState, asMedia),
      // };

    case Actions.ASSET_DROPPED:
      const blockKey = action.payload.eventData.dataTransfer.getData('text');
      const stateWithMovedAsset = moveBlock(state.editorState, blockKey);

      return {
        ...state,
        editorState: stateWithMovedAsset,
      };

      // const afterInsert = Modifier.setBlockType(afterSplit, selection, block.type);

      //     // Get block range and remove dragged block
      // const targetRange = new SelectionState({
      //   anchorKey: blockKey,
      //   anchorOffset: 0,
      //   focusKey: blockKey,
      //   focusOffset: block.getLength(),
      // });
      // const afterRemoval = Modifier.removeRange(afterInsert, targetRange, 'backward');

      // const resetBlock = Modifier.setBlockType(
      //       afterRemoval,
      //       afterRemoval.getSelectionAfter(),
      //       'unstyled'
      //     );

      // const newState = EditorState.push(state.editorState, resetBlock, 'remove-range');
      // const stateWithMovedAsset = EditorState.forceSelection(newState, resetBlock.getSelectionAfter());

      // return {
      //   ...state,
      //   editorState: stateWithMovedAsset,
      // };


    default:
      return state;
  }
}
