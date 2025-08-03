import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';

// Sample data interface
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar?: string;
}

// Generate sample data
const generateSampleData = (): Employee[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const statuses: ('Active' | 'Inactive' | 'On Leave')[] = ['Active', 'Inactive', 'On Leave'];
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown',
    'Emily Davis', 'Chris Miller', 'Lisa Garcia', 'Robert Jones', 'Maria Rodriguez',
    'James Wilson', 'Jennifer Taylor', 'Michael Anderson', 'Jessica Thomas', 'William Jackson',
    'Ashley White', 'Matthew Harris', 'Amanda Martin', 'Daniel Thompson', 'Stephanie Garcia',
    'Kevin Lee', 'Michelle Lewis', 'Brian Clark', 'Nicole Robinson', 'Steven Walker',
    'Kimberly Hall', 'Edward Allen', 'Donna Young', 'Jason Hernandez', 'Carol King',
    'Mark Wright', 'Sandra Lopez', 'Paul Hill', 'Betty Scott', 'Kenneth Green',
    'Helen Adams', 'Joshua Baker', 'Deborah Gonzalez', 'Andrew Nelson', 'Dorothy Carter',
    'Eric Mitchell', 'Lisa Perez', 'Ryan Roberts', 'Nancy Turner', 'Jacob Phillips',
    'Karen Campbell', 'Alexander Parker', 'Susan Evans', 'Nicholas Edwards', 'Margaret Collins'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: names[index % names.length],
    email: `${names[index % names.length].toLowerCase().replace(' ', '.')}@company.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    salary: Math.floor(Math.random() * 80000) + 40000,
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
  }));
};

const SampleDataGrid: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const rows = generateSampleData();

  // Define columns
  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Full Name',
      width: 150,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      flex: 1,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 120,
      type: 'number',
      valueFormatter: (value) => `$${value.toLocaleString()}`,
    },
    {
      field: 'joinDate',
      headerName: 'Join Date',
      width: 120,
      type: 'date',
      valueGetter: (value) => new Date(value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const getColor = (status: string) => {
          switch (status) {
            case 'Active':
              return 'success';
            case 'Inactive':
              return 'error';
            case 'On Leave':
              return 'warning';
            default:
              return 'default';
          }
        };

        return (
          <Chip
            label={params.value}
            color={getColor(params.value) as any}
            size="small"
          />
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', p: 2 }}>
      <Paper elevation={2} sx={{ p: 2, height: 650 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Employee Directory
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Sample MUI DataGrid with pagination, filtering, and sorting
        </Typography>
        
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fafafa',
              borderBottom: '2px solid #e0e0e0',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '2px solid #e0e0e0',
              backgroundColor: '#fafafa',
            },
            '& .MuiDataGrid-toolbarContainer': {
              padding: '8px',
              borderBottom: '1px solid #e0e0e0',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default SampleDataGrid;