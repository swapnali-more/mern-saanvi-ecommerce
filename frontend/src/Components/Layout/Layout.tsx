import React from 'react';
import { Container, useMediaQuery, Theme } from '@mui/material';
import useStyles from './LayoutStyles';

const Layout = ({ children }: any) => {
  const classes = useStyles();
  const isSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('md', 'lg'));
  const isLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('lg', 'xl'));
  const isXlScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  let maxWidthSet: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'lg'; // Default value for maxWidth

  if (isSmScreen) {
    maxWidthSet = 'xl'; // Adjust maxWidth for extra small (xs) and small (sm) screens
  } else if (isMdScreen) {
    maxWidthSet = 'md'; // Adjust maxWidth for medium (md) screens
  } else if (isLgScreen) {
    maxWidthSet = 'lg'; // Adjust maxWidth for large (lg) screens
  } else if (isXlScreen) {
    maxWidthSet = 'xl'; // Adjust maxWidth for extra large (xl) screens
  }

  return (
    <Container maxWidth={maxWidthSet} className={classes.mainContainer}>
      {children}
    </Container>
  );
};

export default Layout;
