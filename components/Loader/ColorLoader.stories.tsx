import type { Meta, StoryObj } from '@storybook/react'
import { ColorLoader } from './index'

const meta = {
  title: 'Components/Loader/ColorLoader',
  component: ColorLoader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof ColorLoader>

export default meta
type Story = StoryObj<typeof meta>

export const ColorLoaderStory: Story = {}
