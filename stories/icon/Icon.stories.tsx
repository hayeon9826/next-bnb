import React from 'react'
import type { Meta } from '@storybook/react'
import { CATEGORY } from '@/constants'
import { Text } from '../text/Text'
import { TextType } from '../text/text.constant'

const meta = {
  title: 'Foundation/Icon',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const IconStory = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {CATEGORY?.map((category, index) => (
        <div className="flex flex-col gap-2 pt-4 w-20" key={index}>
          <category.Icon className="text-2xl mx-auto" />
          <Text
            label={category.title}
            type={TextType.GRAY_SMALL}
            className="text-center"
          />
        </div>
      ))}
    </div>
  )
}
