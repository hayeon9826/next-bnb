import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    isOpen: false,
    title: 'Lorem ipsum dolor sit amet',
    children: (
      <div className="mt-4 text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        ante urna, semper quis finibus a, pellentesque vitae lectus. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Nulla tellus erat,
        pharetra in dui vitae, dignissim laoreet nunc. Praesent ultrices
        ullamcorper libero, a tincidunt nisl facilisis ac. Duis vitae purus
        risus. Morbi eu dui in quam laoreet varius at lacinia diam. Duis
        consequat bibendum justo, sit amet rutrum enim eleifend eget. Duis nisi
        est, tincidunt ut placerat vitae, lacinia et ligula. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Curabitur quam eros, pharetra ac aliquet non, scelerisque quis urna.
      </div>
    ),
    closeModal: () => {
      console.log('close')
    },
  },
}
