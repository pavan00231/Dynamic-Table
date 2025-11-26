import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer, {
  setSearch,
  selectAll,
  unselectAll,
} from "../store/dataTableSlice";
import DataTable from "../components/DataTable";

// Mock data for testing
const mockData = [
  { id: 1, name: "Naruto", location: "Konoha", health: "Healthy", power: 900 },
  { id: 2, name: "Sasuke", location: "Konoha", health: "Injured", power: 850 },
  { id: 3, name: "Sakura", location: "Konoha", health: "Healthy", power: 800 },
];

// Utility to render with mock Redux store
function renderWithStore(initialState = {}) {
  const store = configureStore({
    reducer: { dataTable: dataTableReducer },
    preloadedState: {
      dataTable: {
        search: "",
        selectedLocation: [],
        selectedHealthStatus: [],
        sortOrder: "asc",
        selectedIds: [],
        loading: false,
        ...initialState,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <DataTable data={mockData} />
      </Provider>
    ),
  };
}

describe("DataTable Component (with mock data)", () => {
  

  it("filters table by search input", async () => {
    renderWithStore();

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Naruto" } });

    await waitFor(() => {
      expect(screen.getByText("Naruto")).toBeInTheDocument();
      expect(screen.queryByText("Sasuke")).not.toBeInTheDocument();
      expect(screen.queryByText("Sakura")).not.toBeInTheDocument();
    });
  });

  it("select all and unselect all buttons work", async () => {
    renderWithStore();

    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBe(mockData.length);
      checkboxes.forEach((checkbox) => expect(checkbox.checked).toBe(true));
    });

    const unviewButton = screen.getByText("Unview");
    fireEvent.click(unviewButton);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => expect(checkbox.checked).toBe(false));
    });
  });

  it("sorts table by power", async () => {
    renderWithStore();

    const powerButton = screen.getByText("Power");
    fireEvent.click(powerButton); // toggle sort order

    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1); // skip header
      const powers = rows.map((row) => Number(row.cells[4].textContent));
      expect(powers).toEqual([...powers].sort((a, b) => b - a)); // descending
    });
  });
});
