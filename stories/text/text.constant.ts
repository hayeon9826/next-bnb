export enum TextType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  DESC = 'DESC',
  GRAY_DESC = 'GRAY_DESC',
  PRIMARY_DESC = 'PRIMARY_DESC',
  SMALL = 'SMALL',
  GRAY_SMALL = 'GRAY_SMALL',
}

export const TextTypeStyle: { [key in TextType]: string } = {
  [TextType.TITLE]: 'text-xl md:text-2xl font-semibold',
  [TextType.SUBTITLE]: 'text-lg font-semibold md:text-xl',
  [TextType.DESC]: 'text-xs md:text-sm',
  [TextType.GRAY_DESC]: 'text-xs md:text-sm text-gray-500',
  [TextType.PRIMARY_DESC]: 'text-xs md:text-sm text-rose-500',
  [TextType.SMALL]: 'text-xs',
  [TextType.GRAY_SMALL]: 'text-xs text-gray-500',
}
