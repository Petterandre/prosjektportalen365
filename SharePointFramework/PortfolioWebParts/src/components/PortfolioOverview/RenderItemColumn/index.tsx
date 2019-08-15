import { SearchResult } from '@pnp/sp';
import { formatDate, tryParseCurrency } from '@Shared/helpers';
import { PortfolioOverviewColumn } from 'models';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import { IPortfolioOverviewState } from '../IPortfolioOverviewState';
import { Tag } from './Tag/index';
import { SearchValueType } from 'types';

/**
 * Mapping for rendering of the different data types
 */
const renderDataTypeMap = {
    user: (column: PortfolioOverviewColumn, colValue: string) => {
        if (column.searchType === SearchValueType.OWSUSER) {
            let [email, primaryText] = colValue.split(' | ');
            return (
                <span>
                    <Persona
                        primaryText={primaryText}
                        onRenderPrimaryText={props => (
                            <div>
                                <a href={`mailto:${email}`}>{props.primaryText}</a>
                            </div>
                        )}
                        size={PersonaSize.size24}
                        presence={PersonaPresence.none} />
                </span>
            );
        }
        return (
            <span>
                <Persona primaryText={colValue} size={PersonaSize.size24} presence={PersonaPresence.none} />
            </span>
        );
    },
    date: (_column: PortfolioOverviewColumn, colValue: string) => (
        <span>
            {formatDate(colValue)}
        </span>
    ),
    currency: (_column: PortfolioOverviewColumn, colValue: string) => (
        <span>
            {tryParseCurrency(colValue, '')}
        </span>
    ),
    tags: (_column: PortfolioOverviewColumn, colValue: string) => {
        let tags: string[] = colValue.split(';');
        return (
            <span>
                {tags.map((text, idx) => <Tag key={idx} text={text} />)}
            </span>
        );
    },
};

/**
 * On render item activeFilters
*
* @param {SearchResult} item Item
* @param {PortfolioOverviewColumn} column Column
* @param {void} onUpdateState On update state
*/
export function renderItemColumn(item: SearchResult, column: PortfolioOverviewColumn, onUpdateState: (state: Partial<IPortfolioOverviewState>) => void) {
    const colValue = item[column.fieldName];

    if (!colValue) return null;

    switch (column.fieldName) {
        case 'Title': {
            return (
                <span>
                    <a href={item.Path} target='_blank'>{colValue}</a>
                    <a href='#' style={{ marginLeft: 8 }} onClick={_ => { onUpdateState({ showProjectInfo: item }); }}> <Icon iconName='OpenInNewWindow' /></a>
                </span >
            );
        }
    }

    if (renderDataTypeMap[column.dataType]) {
        return renderDataTypeMap[column.dataType](column, colValue);
    }

    const config = column.config ? column.config[colValue] : null;
    if (config) {
        return (
            <span>
                <Icon iconName={config.iconName} style={{ color: config.color, marginRight: 4 }} />
                <span>{colValue}</span>
            </span>
        );
    }
    return (
        <span>
            {colValue}
        </span>
    );
}