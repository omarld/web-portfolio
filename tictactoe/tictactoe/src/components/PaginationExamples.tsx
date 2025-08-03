import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Typography,
  Stack,
} from '@mui/material';

// Simple data interface
interface SimpleData {
  id: number;
  name: string;
  value: number;
  category: string;
}

const PaginationExamples: React.FC = () => {
  // State for different pagination models
  const [serverPaginationModel, setServerPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const [clientPaginationModel, setClientPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 8,
  });

  // Generate sample data
  const generateData = (count: number): SimpleData[] => {
    const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      value: Math.floor(Math.random() * 1000) + 1,
      category: categories[index % categories.length],
    }));
  };

  const smallDataset = generateData(25);
  const largeDataset = generateData(100);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150, flex: 1 },
    { 
      field: 'value', 
      headerName: 'Value', 
      width: 120, 
      type: 'number',
      valueFormatter: (value) => `${value.toLocaleString()}`
    },
    { field: 'category', headerName: 'Category', width: 130 },
  ];

  return (
    <Stack spacing={4} sx={{ width: '100%', p: 2 }}>
      {/* Client-side pagination example */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Client-Side Pagination (25 items)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          All data is loaded at once, pagination handled by the grid
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={smallDataset}
            columns={columns}
            paginationModel={clientPaginationModel}
            onPaginationModelChange={setClientPaginationModel}
            pageSizeOptions={[5, 8, 10]}
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Server-side pagination simulation */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Server-Side Pagination Simulation (100 items)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simulates server-side pagination with page-based data loading
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={largeDataset.slice(
              serverPaginationModel.page * serverPaginationModel.pageSize,
              (serverPaginationModel.page + 1) * serverPaginationModel.pageSize
            )}
            columns={columns}
            paginationModel={serverPaginationModel}
            onPaginationModelChange={setServerPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            rowCount={largeDataset.length}
            paginationMode="server"
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#e3f2fd',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Custom pagination styling */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Custom Styled Pagination
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          DataGrid with custom pagination styling and larger page sizes
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={largeDataset}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#fff3e0',
                borderTop: '2px solid #ff9800',
              },
              '& .MuiTablePagination-root': {
                color: '#e65100',
              },
              '& .MuiTablePagination-selectLabel': {
                fontWeight: 'bold',
              },
              '& .MuiTablePagination-displayedRows': {
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default PaginationExamples;