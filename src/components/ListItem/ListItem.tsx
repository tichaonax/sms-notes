import { Button } from 'antd';
import React from 'react'; 
import { Item } from 'state';
import componentStyles from '../../components/ListItemLink/ListItemLink.module.scss';
import styles from './ListItem.module.scss';

export interface ListItemProps {
    item: Item,
    activeItem: boolean
    onDeleteNote: (uuid: string) => void,
};

export const listItemNoDataMessage = 'No Data';

export const ListItem: React.FC<ListItemProps> = (props) => {
    const {item, activeItem, onDeleteNote} = props;
    
    return (
        <div className={(activeItem)
                ? `${componentStyles.active} ${componentStyles.component}`
                : componentStyles.component }
        >

            <div className={styles.inner}>

                <h1 data-test="ListItemHeading">
                    <Button type="text" onClick={(e) => onDeleteNote(item.uuid)}>Delete</Button>
                    <strong>
                        { item.title ? item.title : listItemNoDataMessage }
                    </strong>
                </h1> 

                <h2 data-test="ListItemSubHeading">
                    { item.note ?  item.note : listItemNoDataMessage }
                </h2>
            </div>
        </div> 
    );
};

export default ListItem;