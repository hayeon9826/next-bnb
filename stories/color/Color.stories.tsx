import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorTypes } from './color.constant'
import cn from 'classnames'
import { Text } from '../text/Text'
import { TextType } from '../text/text.constant'

const meta = {
  title: 'Foundation/Color',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const ColorStory = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {Object.entries(ColorTypes)?.map(([key, value]) => (
        <div className="flex flex-col gap-2 pt-4" key={key}>
          <div className={cn('rounded-md w-24 h-32 shadow', value)} />
          <Text label={key} type={TextType.SMALL} className="text-center" />
        </div>
      ))}
    </div>
  )
}
