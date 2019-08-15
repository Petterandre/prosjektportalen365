import { IColumn, DetailsListLayoutMode, SelectionMode, ConstrainMode } from 'office-ui-fabric-react/lib/DetailsList';
import { SearchResult } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';

export interface IAggregatedSearchListProps {
    title: string;
    dataSource: string;
    pageContext: PageContext;
    queryTemplate?: string;
    postFetch?: (results: SearchResult[]) => Promise<any[]>;
    selectProperties?: string[];
    showCommandBar?: boolean;
    showSearchBox?: boolean;
    loadingText?: string;
    searchBoxLabelText?: string;
    excelExportEnabled?: boolean;
    columns?: IColumn[];
    layoutMode?: DetailsListLayoutMode;
    constrainMode?: ConstrainMode;
    selectionMode?: SelectionMode;
    groupByColumns?: IColumn[];
}