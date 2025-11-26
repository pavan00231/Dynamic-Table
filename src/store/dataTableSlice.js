// store/dataTableSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  selectedLocation: [],
  selectedHealthStatus: [],
  sortOrder: "asc",
  selectedIds: [],
  loading: true
};

const dataTableSlice = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    toggleSelect(state, action) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((item) => item !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    
    selectAll(state, action) {
      state.selectedIds = action.payload; // array of IDs
    },
    unselectAll(state) {
      state.selectedIds = [];
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    setSelectedHealthStatus(state, action) {
      state.selectedHealthStatus = action.payload;
    },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    setSelectedIds(state, action) {
      state.selectedIds = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    toggleRow(state, action) {
      const newSet = new Set(state.selectedIds);
      newSet.has(action.payload) ? newSet.delete(action.payload) : newSet.add(action.payload);
      state.selectedIds = newSet;
    }
  }
});

export const {
  setSearch,
  setSelectedLocation,
  setSelectedHealthStatus,
  toggleSortOrder,
  setSelectedIds,
  setLoading,
  toggleRow,
  toggleSelect,
  unselectAll,
  selectAll
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
