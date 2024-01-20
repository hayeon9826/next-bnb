import type { Meta, StoryObj } from '@storybook/react'
import { ListLoader } from './index'

const meta = {
  title: 'Components/Loader/ListLoader',
  component: ListLoader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof ListLoader>

export default meta
type Story = StoryObj<typeof meta>

export const ListLoaderStory: Story = {}
