import { render, screen, fireEvent } from "@testing-library/react";
import TableRow from "../components/TableRow";

describe("TableRow Component", () => {
  const char = {
    id: 1,
    name: "Naruto",
    location: "Konoha",
    health: "Healthy",
    power: 9000,
  };

  it("renders character data correctly", () => {
    render(<TableRow char={char} checked={false} onCheck={() => {}} />);

    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("Konoha")).toBeInTheDocument();
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("9000")).toBeInTheDocument();
  });

  it("renders checkbox with correct checked state", () => {
    const { rerender } = render(<TableRow char={char} checked={false} onCheck={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBe(false);

    // Rerender with checked true
    rerender(<TableRow char={char} checked={true} onCheck={() => {}} />);
    expect(checkbox.checked).toBe(true);
  });

  it("calls onCheck callback when checkbox is clicked", () => {
    const onCheckMock = vi.fn();
    render(<TableRow char={char} checked={false} onCheck={onCheckMock} />);
    
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onCheckMock).toHaveBeenCalledTimes(1);
    expect(onCheckMock).toHaveBeenCalledWith(char.id);
  });
});
