import { useState } from "react";
import { FilterIcon } from "../assets/svg/svgComponent";

export default function FilterDropdown({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    const handleCheck = (option) => {
        if (selected.includes(option)) {
            onChange(selected.filter(item => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div style={{ marginRight: "20px", position: "relative" }}
            onMouseEnter={() => setOpen(true)}  
            onMouseLeave={() => setOpen(false)} 
        >
            <button onClick={toggleOpen}

                style={{
                    padding: "6px 10px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px", 
                }}>
                {label} <span style={{ display: "flex", alignItems: "center" }}>{FilterIcon}</span>
            </button>

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "35px",
                        left: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "10px",
                        zIndex: 10,
                        width: '100px'
                    }}
                >
                    {options.map((opt) => (
                        <label key={opt} style={{

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '6px'
                        }}>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => handleCheck(opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
