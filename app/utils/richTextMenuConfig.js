import Html from './htmlConstants';
import icons from '../svg/Icons';

const {
    arrowIcon,
    boldIcon,
    bulletsIcon,
    italicIcon,
    linkIcon,
    numbersIcon,
    quoteIcon,
    subscriptIcon,
    superscriptIcon,
} = icons;

const MARK = 'mark';
const BLOCK = 'block';
const LINK = 'link';
const DROPDOWN = 'dropdown';

const RichTextButtons = {
  BLOCKQUOTE: {
    buttonType: BLOCK,
    type: Html.HTML_BLOCKQUOTE,
    icon: quoteIcon,
    text: '',
  },
  BOLD: {
    buttonType: MARK,
    type: Html.HTML_BOLD,
    icon: boldIcon,
    text: '',
  },
  ITALIC: {
    buttonType: MARK,
    type: Html.HTML_ITALIC,
    icon: italicIcon,
    text: '',
  },
  LINK: {
    buttonType: LINK,
    type: Html.HTML_LINK,
    icon: linkIcon,
    text: '',
  },
  ORDERED_LIST: {
    buttonType: BLOCK,
    type: Html.HTML_ORDERED_LIST,
    icon: numbersIcon,
    text: '',
  },
  PARAGRAPH_DROPDOWN: {
    buttonType: DROPDOWN,
    type: Html.HTML_PARAGRAPH,
    icon: arrowIcon,
    text: 'paragraph',
  },
  SUBSCRIPT: {
    buttonType: MARK,
    type: Html.HTML_SUBSCRIPT,
    icon: subscriptIcon,
    text: '',
  },
  SUPERSCRIPT: {
    buttonType: MARK,
    type: Html.HTML_SUPERSCRIPT,
    icon: superscriptIcon,
    text: '',
  },
  UNORDERED_LIST: {
    buttonType: BLOCK,
    type: Html.HTML_UNORDERED_LIST,
    icon: bulletsIcon,
    text: '',
  },
};

export default RichTextButtons;

export const storytextPrimary = [
  RichTextButtons.BOLD,
  RichTextButtons.ITALIC,
  RichTextButtons.UNORDERED_LIST,
  RichTextButtons.ORDERED_LIST,
  RichTextButtons.BLOCKQUOTE,
  RichTextButtons.LINK,
];
