import type { Meta, StoryObj } from '@storybook/react'
import { GridLoader } from './index'

const meta = {
  title: 'Components/Loader/GridLoader',
  component: GridLoader,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof GridLoader>

export default meta
type Story = StoryObj<typeof meta>

export const GridLoaderStory: Story = {}
