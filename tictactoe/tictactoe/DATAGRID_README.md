# MUI DataGrid with Pagination Examples

This project demonstrates various implementations of Material-UI (MUI) DataGrid components with different pagination approaches.

## Features Implemented

### 1. Sample DataGrid Component (`SampleDataGrid.tsx`)
- **Employee Directory** with rich data visualization
- **Custom Column Types**: Avatar images, status chips, formatted salary
- **Advanced Features**:
  - Checkbox selection
  - Quick filter/search functionality
  - GridToolbar with export capabilities
  - Sortable and filterable columns
  - Custom styling with MUI theming

### 2. Pagination Examples (`PaginationExamples.tsx`)
- **Client-Side Pagination**: All data loaded at once
- **Server-Side Pagination**: Simulated server-side data loading
- **Custom Styled Pagination**: Themed pagination controls

## Key Pagination Features

### Pagination Options
```typescript
pageSizeOptions={[5, 10, 25, 50]}
```

### Pagination State Management
```typescript
const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
});
```

### Server-Side Pagination
```typescript
paginationMode="server"
rowCount={totalItems}
onPaginationModelChange={handlePaginationChange}
```

## Installation & Setup

### Required Dependencies
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid
```

### Optional Dependencies (for icons and additional features)
```bash
npm install @mui/icons-material
```

## Component Structure

```
src/
├── components/
│   ├── SampleDataGrid.tsx      # Full-featured employee directory
│   └── PaginationExamples.tsx  # Various pagination patterns
└── App.tsx                     # Main app with theme provider
```

## Usage Examples

### Basic DataGrid with Pagination
```tsx
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
});

<DataGrid
  rows={data}
  columns={columns}
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[5, 10, 25]}
/>
```

### Server-Side Pagination
```tsx
<DataGrid
  rows={currentPageData}
  columns={columns}
  paginationMode="server"
  rowCount={totalRowCount}
  paginationModel={paginationModel}
  onPaginationModelChange={handleServerPagination}
/>
```

## Styling Customization

### Custom Pagination Styling
```tsx
sx={{
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#f5f5f5',
    borderTop: '2px solid #e0e0e0',
  },
  '& .MuiTablePagination-root': {
    color: '#1976d2',
  },
}}
```

## Column Configuration Examples

### Avatar Column
```tsx
{
  field: 'avatar',
  headerName: '',
  width: 70,
  renderCell: (params) => (
    <Avatar src={params.value} alt={params.row.name} />
  ),
}
```

### Status Chip Column
```tsx
{
  field: 'status',
  headerName: 'Status',
  renderCell: (params) => (
    <Chip
      label={params.value}
      color={getStatusColor(params.value)}
      size="small"
    />
  ),
}
```

### Formatted Number Column
```tsx
{
  field: 'salary',
  headerName: 'Salary',
  type: 'number',
  valueFormatter: (value) => `$${value.toLocaleString()}`,
}
```

## Performance Considerations

1. **Client-Side Pagination**: Best for smaller datasets (< 1000 rows)
2. **Server-Side Pagination**: Recommended for large datasets
3. **Virtual Scrolling**: Consider for very large client-side datasets
4. **Data Optimization**: Use proper data types and avoid unnecessary re-renders

## Advanced Features

### Quick Filter
```tsx
slots={{
  toolbar: GridToolbar,
}}
slotProps={{
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
}}
```

### Selection
```tsx
checkboxSelection
disableRowSelectionOnClick
onRowSelectionModelChange={handleSelectionChange}
```

## Running the Examples

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser to `http://localhost:5173`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 11+ (with polyfills)

## Resources

- [MUI DataGrid Documentation](https://mui.com/x/react-data-grid/)
- [Pagination API Reference](https://mui.com/x/api/data-grid/data-grid/#pagination)
- [Column Definition Guide](https://mui.com/x/react-data-grid/column-definition/)