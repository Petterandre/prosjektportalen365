import * as React from 'react';
import { Version } from '@microsoft/sp-core-library';
import LatestProjects from './components/LatestProjects';
import { ILatestProjectsProps } from './components/ILatestProjectsProps';
import PortfolioBaseWebPart from '../@portfolioBaseWebPart';
import { Logger, LogLevel } from '@pnp/logging';

export interface ILatestProjectsWebPartProps {
  title: string;
}

export default class LatestProjectsWebPart extends PortfolioBaseWebPart<ILatestProjectsWebPartProps> {
  public render(): void {
    Logger.log({ message: '(LatestProjectsWebPart) render: Rendering <LatestProjects />', level: LogLevel.Info });
    const element: React.ReactElement<ILatestProjectsProps> = React.createElement(
      LatestProjects,
      {
        context: this.context,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        serverRelativeUrl: this.context.pageContext.web.serverRelativeUrl,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        ...this.properties,
      }
    );
    super._render(this.manifest.alias, element);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  protected onDispose(): void {
    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse(this.manifest.version);
  }
}
