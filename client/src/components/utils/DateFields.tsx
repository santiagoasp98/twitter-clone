import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { getDaysInMonth, months, years } from '@utils/dateUtils'

interface DateFieldsProps {
  day: number
  setDay: React.Dispatch<React.SetStateAction<number>>
  month: number
  setMonth: React.Dispatch<React.SetStateAction<number>>
  year: number
  setYear: React.Dispatch<React.SetStateAction<number>>
}

export const DateFields: React.FC<DateFieldsProps> = ({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
}) => {
  return (
    <>
      <Typography style={{ marginTop: 30, marginBottom: 30 }}>
        Date of birth
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'grey' }}>Month</InputLabel>
            <Select
              value={month + 1}
              label="Month"
              onChange={(e) => setMonth(Number(e.target.value) - 1)}
            >
              {months.map((month, index) => (
                <MenuItem value={index + 1} key={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'grey' }}>Day</InputLabel>
            <Select
              value={day}
              label="Day"
              onChange={(e) => setDay(Number(e.target.value))}
            >
              {Array.from({ length: getDaysInMonth(month, year) }, (_, i) => (
                <MenuItem value={i + 1} key={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'grey' }}>Year</InputLabel>
            <Select
              value={year}
              label="Year"
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {years.map((year, index) => (
                <MenuItem value={year} key={index}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
