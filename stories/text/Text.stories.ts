import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'
import { TextType } from './text.constant'

const meta = {
  title: 'Foundation/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
    type: {
      control: 'select',
      options: Object.keys(TextType),
      mapping: TextType,
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TextStory: Story = {
  args: {
    label:
      'Fastcampus Nextbnb는 Next.js 13을 이용한 숙박 공유 플랫폼입니다. 가나다라마바사 1234567890 ~!@#$%^&*()_',
  },
}
