import React from 'react';
import styled from 'styled-components';
import ClockPanel from './clock/ClockPanel';
import * as Styles from './styles';

const PageBackground = styled.div`
  width: 100%;
  height: 100%;

  font-size: ${Styles.fontSize};
  font-family: ${Styles.fontFamily};

  color: ${Styles.colors.typeDark};
  background-color: ${Styles.colors.backgroundMain};
`;

const Page: React.FunctionComponent = () =>
  <PageBackground>
    <ClockPanel />
  </PageBackground>
;

export default Page;
