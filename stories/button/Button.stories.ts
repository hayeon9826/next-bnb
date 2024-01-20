import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './Button'
import { ButtonType } from './button.constant'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
    type: {
      control: 'select',
      options: Object.keys(ButtonType),
      mapping: ButtonType,
    },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Black: Story = {
  args: {
    type: ButtonType.BLACK_LARGE,
    label: 'Button',
  },
}

export const PrimaryOutline: Story = {
  args: {
    type: ButtonType.PRIMARY_LARGE_OUTLINE,
    label: 'Button',
  },
}

export const BlackOutline: Story = {
  args: {
    type: ButtonType.BLACK_LARGE_OUTLINE,
    label: 'Button',
  },
}

export const BlackRound: Story = {
  args: {
    type: ButtonType.BLACK_SMALL_ROUNDED,
    label: 'Button',
  },
}

export const Blue: Story = {
  args: {
    type: ButtonType.BLUE_LARGE,
    label: 'Button',
  },
}
