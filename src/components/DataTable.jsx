import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setSearch,
    setSelectedLocation,
    setSelectedHealthStatus,
    toggleSortOrder,
    setLoading,
    selectAll,
    unselectAll,
    toggleSelect
} from "../store/dataTableSlice";
import FilterDropdown from "./FilterDropdown";
import TableRow from "./TableRow";
import Loader from "./Loader";
import useDebounce from "./Debounce";
import './Datatables.css';
import { DownArrowIcon } from "../assets/svg/svgComponent";

export default function DataTable({ data }) {
    const dispatch = useDispatch();
    const {
        search,
        selectedLocation,
        selectedHealthStatus,
        sortOrder,
        selectedIds,
        loading
    } = useSelector(state => state.dataTable);

    const debouncedSearch = useDebounce(search, 300);

    const locations = ["Konoha", "Suna", "Kiri", "Iwa", "Kumo"];
    const healthStatus = ["Injured", "Healthy", "Critical"];

    const baseData = useMemo(() => data, []);

    const filteredData = useMemo(() => {
        let result = baseData;

        if (debouncedSearch.trim()) {
            result = result.filter(item => item.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
        }
        if (selectedLocation.length > 0) {
            result = result.filter(item => selectedLocation.includes(item.location));
        }
        if (selectedHealthStatus.length > 0) {
            result = result.filter(item => selectedHealthStatus.includes(item.health));
        }

        result =
            sortOrder === "asc"
                ? [...result].sort((a, b) => a.power - b.power)
                : [...result].sort((a, b) => b.power - a.power);

        return result;
    }, [debouncedSearch, selectedLocation, selectedHealthStatus, sortOrder, baseData]);

    useEffect(() => {
        dispatch(setLoading(true));
        const timer = setTimeout(() => dispatch(setLoading(false)), 200);
        return () => clearTimeout(timer);
    }, [debouncedSearch, dispatch]);

    const handleToggleSelect = useCallback((id) => {
        dispatch(toggleSelect(id));
    }, [dispatch]);

    const handleSelectAll = useCallback(() => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(selectAll(filteredData.map((item) => item.id)));
            dispatch(setLoading(false));
        }, 50);
    }, [dispatch, filteredData]);

    const handleUnselectAll = useCallback(() => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(unselectAll());
            dispatch(setLoading(false));
        }, 50);
    }, [dispatch]);
    return (
        <div style={{ padding: "20px" }}>
            <div style={{

                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
            }}>

                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    style={{ padding: "6px", width: "220px" ,height:'35px'}}
                    data-testid="search-input"
                />
                <button
                    onClick={() => console.log("Selected IDs:", Array.from(selectedIds))}
                    style={{
                        marginLeft: "10px", padding: "6px 12px",
                        width: '130px',
                        border: '1px solid'
                    }}
                >
                    Submit
                </button>
            </div>

            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
                <thead>
                    <tr>
                        <th scope="col" >
                            {selectedIds.length === 0 ? (
                                <button onClick={handleSelectAll}>View</button>
                            ) : (
                                <button onClick={handleUnselectAll}>Unview</button>
                            )}
                        </th>


                        <th scope="col">Name</th>
                        <th scope="col">
                            <FilterDropdown
                                label="Location"
                                options={locations}
                                selected={selectedLocation}
                                onChange={(value) => dispatch(setSelectedLocation(value))}
                            />
                        </th>
                        <th scope="col">
                            <FilterDropdown
                                label="Health"
                                options={healthStatus}
                                selected={selectedHealthStatus}
                                onChange={(value) => dispatch(setSelectedHealthStatus(value))}
                            />
                        </th>
                        <th scope="col">
                            <button
                                onClick={() => dispatch(toggleSortOrder())}
                                style={{
                                    padding: "6px 12px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                Power
                                <span style={{
                                    display: "flex", alignItems: "center",
                                    transform: sortOrder === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s ease",
                                }}>
                                    {DownArrowIcon}
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <Loader />
                    ) : filteredData.length > 0 ? (
                        filteredData.map(char => (
                            <TableRow
                                key={char.id}
                                char={char}
                                checked={selectedIds.includes(char.id)}
                                onCheck={handleToggleSelect}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
