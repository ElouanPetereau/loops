import '@armantang/html-diff/dist/index.css';
import { ICell } from '@jupyterlab/nbformat';
import { createStyles } from '@mantine/core';
import React, { useContext } from 'react';
import { DiffDetail } from '../Detail/DiffDetail';
import { JupyterAppContext } from './LoopsSidebar';
import { CellProvenance } from '../Provenance/JupyterListener';

const useStyles = createStyles((theme, _params, getRef) => ({
  CompareBadge: {
    label: 'CompareBadge',

    position: 'absolute',
    top: '-0.25rem',
    right: '0.75rem',
    height: '0.8rem',
    zIndex: 1,
    padding: '0 0.4rem',

    backgroundColor: '#333',
    color: 'white',
    lineHeight: '0.8rem',
    fontSize: '0.8rem',
    textAlign: 'center',

    borderRadius: '0.4rem',

    cursor: 'pointer'
  }
}));

interface ICompareBadgeProps {
  old: CellProvenance;
  oldStateNo: number;
  oldTimestamp: Date;
  current: CellProvenance;
  currentStateNo: number;
  currentTimestamp: Date;
}

let detail: DiffDetail;

/** parent needs to have positon:relative set */
export function CompareBadge({
  old,
  oldStateNo,
  oldTimestamp,
  current,
  currentStateNo,
  currentTimestamp
}: ICompareBadgeProps): JSX.Element {
  const { classes, cx } = useStyles();

  const app = useContext(JupyterAppContext);

  const openDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    detail?.close();
    detail = new DiffDetail(
      {
        cell: old,
        stateNo: oldStateNo,
        timestamp: oldTimestamp
      },
      {
        cell: current,
        stateNo: currentStateNo,
        timestamp: currentTimestamp
      }
    );
    app.shell.add(detail, 'down');
  };

  return (
    <div
      onClick={openDetails}
      onDoubleClick={e => e.stopPropagation()}
      className={cx(classes.CompareBadge, 'compare-badge')}
    >
      Diff
    </div>
  );
}