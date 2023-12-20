import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Filters from './components/Filters';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/system';
import './App.css'

const StyledCard = styled(Card)({
  minWidth: 275,
  marginBottom: (theme) => theme.spacing(2),
});

const StyledPopup = styled(Dialog)({
  widthidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: (theme) => theme.spacing(2), // Add spacing around the content
});

const App = () => {

  /*Declarations*/

  const [data, setData] = useState([]);
  const [currentpage, setCurrentPage] = useState(1)
  const dataArray = data[0]
  const noOfPages = Math.floor(data[1] / 9)
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    location: [],
    IndustryVertical: [],
    investmentType: [],

  });


  /*Pop-up*/
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };


  /*Fetch Data From Backend*/

  const fetchData = async () => {

    try {
      const res = await fetch('/home', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setData(data);
      if (!res.status === 200) {
        console.log('Error');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  /*Post page number to backend*/

  const handlePageChange = (e, p) => {
    setCurrentPage(p)
    postPage(p)
  }

  const postPage = async (p) => {

    try {
      const res = await fetch('/current-page', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page: p }),
      });

      const data = await res.json();
      setData(data);

      if (!res.status === 200) {
        console.log('Error');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Filters*/

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async () => {

    try {
      const res = await fetch('/filtered-data', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters , searchInput }),
      });

      const data = await res.json();
      setData(data)

      if (!res.status === 200) {
        console.log('Error');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="App">
      <AppBar />

      {/*Search Bar*/}
      <Grid container justifyContent="center" alignItems="center" mt={3} mb={3} style={{
        width: '100%', 
        height: '50%', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextField
          id="filled-search"
          label="Search Start ups here ..."
          type="search"
          style={{ width: '95%' }}
          onChange={handleSearchChange}
        />
      </Grid>

      <Box display="flex" flexDirection="row">

        <Box>
          <Box margin={5}>

            {/*Cards*/}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {dataArray && dataArray.length > 0 ? (dataArray.map((object, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {object.StartupName}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {object.IndustryVertical}
                      </Typography>
                      <Button variant="contained" onClick={handleOpen}>
                        More Details
                      </Button>
                    </CardContent>

                    {/* Popup Dialog */}
                    <StyledPopup open={open} onClose={handleClose}>
                      <DialogTitle className='MakeItCentre'> More Details</DialogTitle>
                      <table>
                        <tr>
                          <td>Start-up Name</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.StartupName}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>Industry Vertical</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.IndustryVertical}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>Sub-Vertical</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.SubVertical}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.CityLocation}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>Investor Name</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.InvestorName}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>Investment Type</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.InvestmentType}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                        <tr>
                          <td>Amount in USD</td>
                          <td><DialogContent>{object.StartupName !== "" ? (<DialogContentText>{object.AmountInUSD}</DialogContentText>) : (<DialogContentText>Data Unavailable</DialogContentText>)}</DialogContent></td>
                        </tr>
                      </table>

                      <DialogActions>
                        <Button onClick={handleClose} variant="outlined">
                          Close
                        </Button>
                      </DialogActions>
                    </StyledPopup>
                  </StyledCard>
                </Grid>
              ))
              ) : (
                <Typography variant="h6" component="div">
                  Data Unavailable
                </Typography>)}
            </Grid>

            {/*Pagination*/}
            <Grid container justifyContent="center" alignItems="center" mt={7} mb={7}>
              <Pagination count={noOfPages} color="primary" size="large" showFirstButton={true} showLastButton={true} onChange={handlePageChange} />
            </Grid>

          </Box>
        </Box>

        {/*Filter */}
        <Box width="25%" pr={5}>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>

          <br /><br />
          <Filters onFilterChange={handleFilterChange} />


        </Box>

      </Box>
    </div>
  );
};

export default App;