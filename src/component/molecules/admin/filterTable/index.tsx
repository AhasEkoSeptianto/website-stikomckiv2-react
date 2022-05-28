import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { Fragment, useState } from "react";

type I_FilterTable = {
  filter: I_FillData[];
};

type I_FillData = {
  type: "search";
  selectOpt?: I_SlcOpt[];
  cb: (key: any, value: any) => void;
};

type I_SlcOpt = {
  label: string;
  value: any;
  key: any
};

export default function FilterTable(props: I_FilterTable) {
  const { filter } = props;
  return (
    <div className="flex items-center my-2">
      {filter.map((item, idx) => (
        <Fragment>
          {item.type === "search" ? <SearchFilter {...item} /> : null}
        </Fragment>
      ))}
    </div>
  );
}

const SearchFilter = (props: I_FillData) => {

    const { type, cb, selectOpt } = props

    const [selectBy, setSelectedBy] = useState<any>(selectOpt?.[0].value)

    const HandleChangeSearch = (e: any) => {
        cb(selectBy, e.target.value)
    }

  return (
    <div>
      <TextField
        label="Search"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                variant="standard"
                label="Age"
                onChange={e => setSelectedBy(e.target.value)}
                value={selectBy}
                disableUnderline
              >
                {selectOpt?.map((item, idx) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onChange={HandleChangeSearch}
      />
    </div>
  );
};
