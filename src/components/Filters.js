// Filters.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

const LocationArray = ['Bangalore', 'Mumbai', 'Delhi', 'Gurgaon', 'Pune', 'Noida', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Other'];
const IndustryArray = ['Consumer Internet', 'Technology', 'Ecommerce', 'Healthcare', 'Logistics', 'Education', 'Food&Beverages', 'Finance', 'Uncategorized', 'Other'];
const InvestmentTypeArray = ['Seed Funding', 'Private Equity', 'Debt Funding', 'Crowd Funding'];


const Filters = ({ onFilterChange }) => {

    const [selectedFilters, setSelectedFilters] = useState({
        location: [],
        IndustryVertical: [],
        investmentType: [],
      });
    
      const handleCheckboxChange = (category, value) => {
        setSelectedFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (updatedFilters[category].includes(value)) {
            updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
          } else {
            updatedFilters[category] = [...updatedFilters[category], value];
          }
          return updatedFilters;
        });
      };
    
    
      // Notify the parent component about the filter changes
      React.useEffect(() => {
        onFilterChange(selectedFilters);
      }, [selectedFilters, onFilterChange]);

      
    return (
        
            <Box height="95%">
                <Typography>Filter By</Typography>

                <Box textAlign="left">
                    <br />

                    {/* Location */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Location</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                {LocationArray.map((location, index) => (
                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                        <FormControlLabel control={<Checkbox checked={selectedFilters.location.includes(location)} onChange={() => handleCheckboxChange('location', location)} />} label={location} />
                                    </Grid>
                                ))}
                            </Grid>

                        </AccordionDetails>
                    </Accordion>

                    {/* Industry */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Industry</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                {IndustryArray.map((industry, index) => (
                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                        <FormControlLabel control={<Checkbox checked={selectedFilters.IndustryVertical.includes(industry)} onChange={() => handleCheckboxChange('IndustryVertical', industry)} />} label={industry} />
                                    </Grid>
                                ))}</Grid>
                        </AccordionDetails>
                    </Accordion>
                    
                    {/* Investment Type */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Investment Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                {InvestmentTypeArray.map((investmentType, index) => (
                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                        <FormControlLabel control={<Checkbox checked={selectedFilters.investmentType.includes(investmentType)} onChange={() => handleCheckboxChange('investmentType', investmentType)} />} label={investmentType} />
                                    </Grid>
                                ))}</Grid>
                        </AccordionDetails>
                    </Accordion>
                    <br />
                </Box>
            </Box>
        

);
}

export default Filters;

