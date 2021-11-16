import React from 'react';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import address from './address.png';

const Calculator = (pros) => {

  const DAYS_PER_EPOCH = 5;
  const DAYS_PER_YEAR = 365;
  const FIXED_POOL_FEE = 340; // 340 ADA

  const [values, setValues] = React.useState({
    contribution: 5000,  // < poolSize
    poolSize: 500000,    // > contribution
    adaPrice: 2.0,       // > 0
    sundaePrice: 0.08,   // > 0
    stakingAPR: 5,    // >= 0
    poolCommision: 2, // >= 0 and <= 100
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const calculateRewards = () => {
    const stakingRewards = values.contribution * (values.stakingAPR / 100.0 / DAYS_PER_YEAR * DAYS_PER_EPOCH);
    const poolRewards = stakingRewards / (values.contribution / values.poolSize);
    const adjustedPoolrewards = poolRewards / (1 - values.poolCommision / 100.0) + FIXED_POOL_FEE;
    const totalSundae = adjustedPoolrewards * values.adaPrice / values.sundaePrice;

    // assuming every contributed ADA has fair power
    return totalSundae * values.contribution / values.poolSize;
  };

  const isNumber = (value) => {
    return !isNaN(value) && parseInt(value) >= 0;
  };

  return (
    <Grid container spacing={2}
      alignItems="center"
      /* justify="center" */
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom component="div">
          SundaeSwap ISO rewards calculator
      </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Total Contribution"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('contribution')}
          color={isNumber(values.contribution) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">ADA</InputAdornment>,
            inputProps: {
              min: 0,
              max: values.poolSize
            }
          }}
          value={values.contribution}
        />
        <TextField
          label="Pool size"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('poolSize')}
          color={isNumber(values.poolSize) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">ADA</InputAdornment>,
            inputProps: {
              min: values.contribution
            }
          }}
          value={values.poolSize}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Current ADA price"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('adaPrice')}
          color={isNumber(values.adaPrice) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {
              min: 0,
            }
          }}
          value={values.adaPrice}
        />
        <TextField
          label="Initial sundae price"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('sundaePrice')}
          color={isNumber(values.sundaePrice) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {
              min: 0,
            }
          }}
          value={values.sundaePrice}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Staking rewards(APR)"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('stakingAPR')}
          color={isNumber(values.stakingAPR) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
            inputProps: {
              min: 0,
              max: 100
            }
          }}
          value={values.stakingAPR}
        />
        <TextField
          label="Pool commision"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          onChange={handleChange('poolCommision')}
          color={isNumber(values.poolCommision) ? 'success' : 'warning'}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
            inputProps: {
              min: 0,
              max: 100
            }
          }}
          value={values.poolCommision}
        />
      </Grid>

      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {[1, 6].map((epochs, idx) => {
            return (
              <Card sx={{ width: '25ch', margin: '1ch' }} key={idx}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`${epochs} epoch / ${epochs * DAYS_PER_EPOCH} days`}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {(epochs * calculateRewards()).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Grid>

      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {[36, 72].map((epochs, idx) => {
            return (
              <Card sx={{ width: '25ch', margin: '1ch' }} key={idx}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`${epochs} epoch / ${epochs * DAYS_PER_EPOCH} days`}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {(epochs * calculateRewards()).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Grid>

      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '52ch' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="button">How do we calculate the rewards?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>The calculation is based on{' '}
                <Link href="https://old.reddit.com/r/SundaeSwap/comments/ngc3k4/how_to_calculate_your_sundae_rewards" underline="hover">
                  how_to_calculate_your_sundae_rewards
                </Link>
                {' '}with the assumption that all ADA has equal power of earning Sudae tokens.
          </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="button">Additional resources?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link href="https://sundaeswap-finance.medium.com/sundaeswap-iso-details-110699d0d7fb">
                  SundaeSwap ISO Details
                </Link><br />
                <Link href="https://cardanode.com.au/sundaeswap-iso-complete-guide-sundae-tokens/">
                  SundaeSwap ISO: Easy Complete Guide
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="button">Donation welcome!</Typography>
            </AccordionSummary>
            <AccordionDetails styles={{ justifyContent: 'left' }}>
              <Typography>
                If you would like to support our work, please consider donating
                <Typography variant="overline" display="block" gutterBottom>
                  no more than 2.1 ADA
                </Typography> to our address,
                <Link href="https://cardanoscan.io/address/0128d9283d170994651b2e71f8b28d425f956236bb310f9b8635c9cb3228b5d183451a69b3e0e422e90ea503c8207ee4d321aaf8c7aef88cf8" underline="hover">
                  {' '}addr1qy5...tg76
                </Link>
                <img src={address} alt="address-code" />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </Grid >
  );
};

export default Calculator;
