import TableHeaderCell from './TableCell/TableHeaderCell'

const TableHead = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <TableHeaderCell />
        <TableHeaderCell>Заявка</TableHeaderCell>
        <TableHeaderCell>Погрузка</TableHeaderCell>
        <TableHeaderCell>Разгрузка</TableHeaderCell>
      </tr>
    </thead>
  )
}

export default TableHead
