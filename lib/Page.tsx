import styled, { ThemeProvider } from 'lib/styled-components';
import React from 'react';
import ClockPanel from './clock/ClockPanel';
import Panel from './panel/components/Panel';
import * as Styles from './styles';
import mainTheme from './theme';

const PageBackground = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  font-size: ${Styles.fontSize};
  font-family: ${Styles.fontFamily};

  color: ${props => props.theme.typeDark};
  background-color: ${props => props.theme.backgroundLight};
`;

const CenterPane = styled.section`
  border: 1px solid red;
  flex: 8 450px;
`;

const panelContainerStyles = `
  border: 1px solid red;
  flex: 6 200px;
`;

const LeftPanel = styled.section`
  ${panelContainerStyles}
`;

const RightPanel = styled.section`
  ${panelContainerStyles}
`;

const Page: React.FunctionComponent = () =>
  <ThemeProvider theme={mainTheme}>
    <PageBackground>
      <LeftPanel>
        <Panel />
      </LeftPanel>

      <CenterPane>
        <ClockPanel />
      </CenterPane>

      <RightPanel>
        <Panel />
      </RightPanel>
    </PageBackground>
  </ThemeProvider>
;

export default Page;
