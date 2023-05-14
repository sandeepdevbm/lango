import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  MenuItem,
} from '@mui/material';
import { Form } from 'react-router-dom';

interface QualificationOption {
  label: string;
  value: string;
}

const qualifications: QualificationOption[] = [
  { label: 'Bachelor of Science', value: 'bs' },
  { label: 'Master of Science', value: 'ms' },
  { label: 'Doctor of Philosophy', value: 'phd' },
];

interface StatusOption {
  label: string;
  value: string;
}

const statuses: StatusOption[] = [
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Employed', value: 'employed' },
  { label: 'Student', value: 'student' },
];

export default function Samp() {
  const [role, setRole] = React.useState<string>('student');
  const [qualification, setQualification] = React.useState<QualificationOption | null>(null);
  const [status, setStatus] = React.useState<StatusOption>(statuses[0]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleQualificationChange = (event: React.SyntheticEvent, value: QualificationOption | null) => {
    setQualification(value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStatus = statuses.find((status) => status.value === event.target.value);
    if (selectedStatus) {
      setStatus(selectedStatus);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Form>
        <TextField fullWidth margin="normal" required label="First Name" />
        <TextField fullWidth margin="normal" required label="Last Name" />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Phone Number"
          type="tel"
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Email"
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Password"
          type="password"
        />
        <FormControl component="fieldset" margin="normal" required>
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            row
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="mentor"
              control={<Radio />}
              label="Mentor"
            />
          </RadioGroup>
        </FormControl>
        {role === 'mentor' && (
          <>
            <FormControl fullWidth margin="normal" required>
              <Autocomplete
                id="mentor-qualification-select"
                options={qualifications}
                getOptionLabel={(option) => option.label}
                value={qualification}
                onChange={handleQualificationChange}
                renderInput={(params) => (
                  <TextField {...params} label="Qualification" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <TextField
                id="mentor-status-select"
                select
                label="Currently"
                value={status.value}
                onChange={handleStatusChange}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            </>
          )}
        </Form>
      </Box>
      );
      };

