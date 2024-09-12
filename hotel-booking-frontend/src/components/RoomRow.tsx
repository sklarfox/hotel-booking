import { Table, Button } from 'flowbite-react'
import { RoomRowProps } from './RoomsRoute'

export const RoomRow = ({ room }: RoomRowProps) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{room.name}</Table.Cell>
      <Table.Cell>{room.id}</Table.Cell>
      <Table.Cell>{room.beds}</Table.Cell>
      <Table.Cell>${room.price / 100}</Table.Cell>
      <Table.Cell>
        <div className="flex justify-end space-x-2">
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
