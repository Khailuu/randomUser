import { useState } from "react";
import { NewUser } from "../../../types/manageUser";
import { useGetRandomUser } from "../../../hooks/useGetRamdomUser";

const HomeComponent = () => {
  const [page, setPage] = useState(1); // State to manage the current page
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(
    new Set(["All"])
  ); // State to filter multiple roles
  const [selectedGender, setSelectedGender] = useState<string>("All"); // State to filter gender
  const { data: users, isLoading } = useGetRandomUser(page);

  const roles = ["All", "Dev", "BA", "QC", "PM"];
  const genders = ["All", "male", "female"];

  // Add role and filter
  const newLstUser: NewUser[] =
    users?.map((user: any) => ({
      ...user,
      role: roles[Math.floor(Math.random() * roles.length)], // Random role
    })) || [];

  // Handle role toggle
  const toggleRole = (role: string) => {
    setSelectedRoles((prevSelectedRoles) => {
      const updatedRoles = new Set(prevSelectedRoles);

      if (role === "All") {
        // If 'All' is selected, uncheck all other roles
        return new Set(["All"]);
      }

      if (updatedRoles.has("All")) {
        updatedRoles.delete("All"); // If 'All' is selected, uncheck 'All' when selecting a specific role
      }

      updatedRoles.has(role)
        ? updatedRoles.delete(role)
        : updatedRoles.add(role);

      return updatedRoles;
    });
  };

  // Apply filter
  const filteredUsers = newLstUser.filter((user) => {
    const matchRole = selectedRoles.has("All") || selectedRoles.has(user.role);
    const matchGender =
      selectedGender === "All" || user.gender === selectedGender;
    return matchRole && matchGender;
  });

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          padding: "20px",
          borderRight: "1px solid #ddd",
          height: "100vh",
        }}
      >
        <h3>Filter by Role</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedRoles.has("All")}
                onChange={() => toggleRole("All")}
                style={{ marginRight: "10px" }}
              />
              All
            </label>
          </li>
          {roles.slice(1).map((role) => (
            <li key={role}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedRoles.has(role)}
                  onChange={() => toggleRole(role)}
                  style={{ marginRight: "10px" }}
                />
                {role}
              </label>
            </li>
          ))}
        </ul>

        <h3>Filter by Gender</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {genders.map((gender) => (
            <li key={gender}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={selectedGender === gender}
                  onChange={() => setSelectedGender(gender)}
                  style={{ marginRight: "10px" }}
                />
                {gender}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main style={{ padding: "20px", flex: 1 }}>
        <h1>User Management</h1>

        {/* Dropdown filters */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="role-select">Filter by Role</label>
            <select
              id="role-select"
              value={Array.from(selectedRoles)[0]}
              onChange={(e) => setSelectedRoles(new Set([e.target.value]))}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="gender-select">Filter by Gender</label>
            <select
              id="gender-select"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display users */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {filteredUsers?.map((user) => (
              <div
                key={user.login.uuid}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                  textAlign: "center",
                }}
              >
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  style={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                  }}
                />
                <h3>
                  {user.name.first} {user.name.last}
                </h3>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
                <p>Gender: {user.gender}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{ marginTop: "20px" }}>
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              style={{
                padding: "10px",
                margin: "5px",
                backgroundColor: page === index + 1 ? "#007bff" : "#fff",
                color: page === index + 1 ? "#fff" : "#000",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
