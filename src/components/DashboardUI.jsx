import React from "react";
import { 
  FaUsers, 
  FaTrophy, 
  FaFutbol, 
  FaStar, 

  FaChevronUp,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

const DashboardUI = () => {
  return (
    <div className="sports-dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total-teams">
          <div className="stat-icon">
            <FaUsers size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Teams</h3>
            <p className="stat-number">24</p>
            <span className="stat-trend">
              <FaChevronUp /> 2 this month
            </span>
          </div>
        </div>

        <div className="stat-card active-matches">
          <div className="stat-icon">
            <FaFutbol size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Matches</h3>
            <p className="stat-number">8</p>
            <span className="stat-trend live">LIVE</span>
          </div>
        </div>

        <div className="stat-card total-players">
          <div className="stat-icon">
            <FaUsers size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Players</h3>
            <p className="stat-number">480</p>
            <span className="stat-trend">
              <FaChevronUp /> 5%
            </span>
          </div>
        </div>

        <div className="stat-card league-rating">
          <div className="stat-icon">
            <FaStar size={24} />
          </div>
          <div className="stat-content">
            <h3>League Rating</h3>
            <p className="stat-number">4.8</p>
            <span className="stat-trend">
              <FaChevronUp /> 0.2
            </span>
          </div>
        </div>
      </div>

      {/* League Standings */}
      <div className="league-standings">
        <div className="section-header">
          <FaTrophy className="section-icon" />
          <h2>League Standings</h2>
        </div>
        <div className="standings-table-container">
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {[
                { pos: 1, team: "Team Alpha", played: 12, won: 10, points: 30 },
                { pos: 2, team: "Team Beta", played: 12, won: 9, points: 27 },
                { pos: 3, team: "Team Gamma", played: 12, won: 8, points: 24 },
              ].map((team) => (
                <tr key={team.pos}>
                  <td>{team.pos}</td>
                  <td className="team-name">{team.team}</td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td className="points">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="upcoming-matches">
        <div className="section-header">
          <FaCalendarAlt className="section-icon" />
          <h2>Upcoming Matches</h2>
        </div>
        <div className="matches-list">
          {[
            { 
              id: 1, 
              teams: ["Team Alpha", "Team Beta"], 
              time: "Tomorrow, 3:00 PM", 
              venue: "Stadium A" 
            },
            { 
              id: 2, 
              teams: ["Team Gamma", "Team Delta"], 
              time: "Tomorrow, 5:00 PM", 
              venue: "Stadium B" 
            },
          ].map((match) => (
            <div key={match.id} className="match-card">
              <div className="teams">
                <span className="team">{match.teams[0]}</span>
                <span className="vs">vs</span>
                <span className="team">{match.teams[1]}</span>
              </div>
              <div className="match-details">
                <span className="time">
                  <FaCalendarAlt /> {match.time}
                </span>
                <span className="venue">
                  <FaMapMarkerAlt /> {match.venue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;