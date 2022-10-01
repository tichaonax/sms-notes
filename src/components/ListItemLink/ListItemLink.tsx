import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemProps } from '../ListItem/ListItem';
import styles from './ListItemLink.module.scss';


export interface NoteDeleted {
    setSingleNoteDeleted: (deleted: boolean) => void,
}
export interface ListItemLinkProps extends ListItemProps, NoteDeleted {
    to: string,
    index: number,
    liRef:React.RefObject<HTMLDivElement | null>,
}

export const ListItemLink: React.FC<ListItemLinkProps> = (props) => { 
    return (
            <NavLink to={props.to} state={{index:props.index, liRef:props.liRef}}
                className={(navData) => 
                    navData.isActive 
                    ? `${styles.active} ${styles.component}`
                    : styles.component } 
                    onClick={()=>props.setSingleNoteDeleted(false)}
                >
                <ListItem {...props} />
            </NavLink>
    );
};

export default ListItemLink;