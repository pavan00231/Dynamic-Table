import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "../components/FilterDropdown";
import { useState } from "react";


function FilterDropdownTestWrapper({ options, label }) {
    const [selected, setSelected] = useState([]);
    return (
        <FilterDropdown
            label={label}
            options={options}
            selected={selected}
            onChange={setSelected}
        />
    );
}


describe("FilterDropdown Component", () => {
    const options = ["Konoha", "Suna", "Kiri"];
    let selected = [];
    const handleChange = vi.fn((newSelected) => {
        selected = newSelected;
    });

    beforeEach(() => {
        selected = [];
        handleChange.mockClear();
    });

    it("renders button with label", () => {
        render(<FilterDropdown label="Location" options={options} selected={selected} onChange={handleChange} />);
        expect(screen.getByText("Location")).toBeInTheDocument();
    });

    it("opens dropdown on mouse enter", () => {
        render(
            <FilterDropdown
                label="Location"
                options={options}
                selected={selected}
                onChange={handleChange}
            />
        );

        const wrapper = screen.getByText("Location").parentElement;

        // Hover → dropdown should appear
        fireEvent.mouseEnter(wrapper);

        options.forEach((opt) => {
            expect(screen.getByLabelText(opt)).toBeInTheDocument();
        });
    });
    it("closes dropdown on mouse leave", () => {
        render(
            <FilterDropdown
                label="Location"
                options={options}
                selected={selected}
                onChange={handleChange}
            />
        );

        const wrapper = screen.getByText("Location").parentElement;

        // Hover to open
        fireEvent.mouseEnter(wrapper); expect(screen.getByLabelText("Konoha")).toBeInTheDocument();

        // Move mouse out to close
        fireEvent.mouseLeave(wrapper);
        options.forEach((opt) => {
            expect(screen.queryByLabelText(opt)).not.toBeInTheDocument();
        });
    });

    it("opens dropdown on button click and shows options", () => {
        render(<FilterDropdown label="Location" options={options} selected={selected} onChange={handleChange} />);

        const button = screen.getByText("Location");
        fireEvent.click(button);

        // All options are displayed
        options.forEach((opt) => {
            expect(screen.getByLabelText(opt)).toBeInTheDocument();
        });
    });


    it("calls onChange when a checkbox is clicked", () => {
        render(<FilterDropdownTestWrapper label="Location" options={options} />);

        const button = screen.getByText("Location");
        fireEvent.click(button);

        const konohaCheckbox = screen.getByLabelText("Konoha");

        // Click to select
        fireEvent.click(konohaCheckbox);
        expect(konohaCheckbox.checked).toBe(true);

        // Click to unselect
        fireEvent.click(konohaCheckbox);
        expect(konohaCheckbox.checked).toBe(false);
    });


    it("correctly checks checkboxes based on selected prop", () => {
        selected = ["Suna"];
        render(<FilterDropdown label="Location" options={options} selected={selected} onChange={handleChange} />);

        const button = screen.getByText("Location");
        fireEvent.click(button);

        const sunaCheckbox = screen.getByLabelText("Suna");
        const konohaCheckbox = screen.getByLabelText("Konoha");

        expect(sunaCheckbox.checked).toBe(true);
        expect(konohaCheckbox.checked).toBe(false);
    });
});
