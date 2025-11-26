import reducer, {
  toggleSelect,
  selectAll,
  unselectAll,
  setSearch,
  setSelectedLocation,
  setSelectedHealthStatus,
  toggleSortOrder,
  setSelectedIds,
  setLoading,
  toggleRow
} from "../store/dataTableSlice";

describe("dataTableSlice reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      search: "",
      selectedLocation: [],
      selectedHealthStatus: [],
      sortOrder: "asc",
      selectedIds: [],
      loading: true
    };
  });

  it("should handle toggleSelect: add ID if not present", () => {
    const nextState = reducer(initialState, toggleSelect(1));
    expect(nextState.selectedIds).toEqual([1]);
  });

  it("should handle toggleSelect: remove ID if already present", () => {
    const state = { ...initialState, selectedIds: [1] };
    const nextState = reducer(state, toggleSelect(1));
    expect(nextState.selectedIds).toEqual([]);
  });

  it("should handle selectAll", () => {
    const ids = [1, 2, 3];
    const nextState = reducer(initialState, selectAll(ids));
    expect(nextState.selectedIds).toEqual(ids);
  });

  it("should handle unselectAll", () => {
    const state = { ...initialState, selectedIds: [1, 2] };
    const nextState = reducer(state, unselectAll());
    expect(nextState.selectedIds).toEqual([]);
  });

  it("should handle setSearch", () => {
    const nextState = reducer(initialState, setSearch("Naruto"));
    expect(nextState.search).toBe("Naruto");
  });

  it("should handle setSelectedLocation", () => {
    const nextState = reducer(initialState, setSelectedLocation(["Konoha"]));
    expect(nextState.selectedLocation).toEqual(["Konoha"]);
  });

  it("should handle setSelectedHealthStatus", () => {
    const nextState = reducer(initialState, setSelectedHealthStatus(["Healthy"]));
    expect(nextState.selectedHealthStatus).toEqual(["Healthy"]);
  });

  it("should handle toggleSortOrder", () => {
    const nextState = reducer(initialState, toggleSortOrder());
    expect(nextState.sortOrder).toBe("desc");

    const nextNextState = reducer(nextState, toggleSortOrder());
    expect(nextNextState.sortOrder).toBe("asc");
  });

  it("should handle setSelectedIds", () => {
    const ids = [1, 2, 3];
    const nextState = reducer(initialState, setSelectedIds(ids));
    expect(nextState.selectedIds).toEqual(ids);
  });

  it("should handle setLoading", () => {
    const nextState = reducer(initialState, setLoading(false));
    expect(nextState.loading).toBe(false);
  });

  it("should handle toggleRow: add ID if not present", () => {
    const nextState = reducer(initialState, toggleRow(1));
    expect(nextState.selectedIds).toEqual(new Set([1]));
  });

  it("should handle toggleRow: remove ID if already present", () => {
    const state = { ...initialState, selectedIds: [1, 2] };
    const nextState = reducer(state, toggleRow(1));
    expect(nextState.selectedIds).toEqual(new Set([2]));
  });
});
