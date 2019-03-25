import IExcelExportConfig from 'prosjektportalen-spfx-shared/lib/interfaces/IExcelExportConfig';
import * as strings from 'ExperienceLogWebPartStrings';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IExperienceLogWebPartProps } from '../ExperienceLogWebPart';

export interface IExperienceLogProps extends IExperienceLogWebPartProps {
  context: WebPartContext;
  columns?: IColumn[];
  groupByColumns?: IColumn[];
  excelExportEnabled?: boolean;
  excelExportConfig?: IExcelExportConfig;
}

export const ExperienceLogDefaultProps: Partial<IExperienceLogProps> = {
  title: 'Erfaringslogg',
  columns: [
    {
      key: 'Title',
      fieldName: 'Title',
      name: strings.TitleColumnDisplayName,
      minWidth: 220
    },
    {
      key: 'SiteTitle',
      fieldName: 'SiteTitle',
      name: strings.SiteTitleColumnDisplayName,
      minWidth: 100,
      isResizable: true
    },
    {
      key: 'GtProjectLogDescriptionOWSMTXT',
      fieldName: 'GtProjectLogDescriptionOWSMTXT',
      name: strings.DescriptionColumnDisplayName,
      minWidth: 100,
      isResizable: true
    },
    {
      key: 'GtProjectLogResponsibleOWSCHCS',
      fieldName: 'GtProjectLogResponsibleOWSCHCS',
      name: strings.ResponsibleColumnDisplayName,
      minWidth: 100,
      isResizable: true
    },
    {
      key: 'GtProjectLogConsequenceOWSMTXT',
      fieldName: 'GtProjectLogConsequenceOWSMTXT',
      name: strings.ConsequenceColumnDisplayName,
      minWidth: 100,
      isResizable: true
    },
    {
      key: 'GtProjectLogRecommendationOWSMTXT',
      fieldName: 'GtProjectLogRecommendationOWSMTXT',
      name: strings.RecommendationColumnDisplayName,
      minWidth: 100,
      isResizable: true
    },
    {
      key: 'GtProjectLogActorsOWSCHCM',
      fieldName: 'GtProjectLogActorsOWSCHCM',
      name: strings.ActorsColumnDisplayName,
      minWidth: 100,
      isResizable: true
    }
  ],
  groupByColumns: [{ name: 'Prosjekt', key: 'SiteTitle', fieldName: 'SiteTitle', minWidth: 100 }],
  excelExportEnabled: true,
  excelExportConfig: {
    fileNamePrefix: strings.ExcelExportFileNamePrefix,
    sheetName: 'Sheet A',
    buttonLabel: strings.ExcelExportButtonLabel,
    buttonIcon: 'ExcelDocument',
  },
};
