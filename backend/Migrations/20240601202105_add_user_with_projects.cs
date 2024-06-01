using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class add_user_with_projects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TechStacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechStacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    OwnerId = table.Column<int>(type: "integer", nullable: false),
                    GithubLink = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSkills",
                columns: table => new
                {
                    SkillsId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkills", x => new { x.SkillsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserSkills_Skills_SkillsId",
                        column: x => x.SkillsId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSkills_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTechStacks",
                columns: table => new
                {
                    TechStacksId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTechStacks", x => new { x.TechStacksId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserTechStacks_TechStacks_TechStacksId",
                        column: x => x.TechStacksId,
                        principalTable: "TechStacks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTechStacks_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDevelopers",
                columns: table => new
                {
                    DevelopersId = table.Column<int>(type: "integer", nullable: false),
                    ProjectsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDevelopers", x => new { x.DevelopersId, x.ProjectsId });
                    table.ForeignKey(
                        name: "FK_ProjectDevelopers_Projects_ProjectsId",
                        column: x => x.ProjectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectDevelopers_Users_DevelopersId",
                        column: x => x.DevelopersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSkills",
                columns: table => new
                {
                    LookingForSkillsId = table.Column<int>(type: "integer", nullable: false),
                    ProjectsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSkills", x => new { x.LookingForSkillsId, x.ProjectsId });
                    table.ForeignKey(
                        name: "FK_ProjectSkills_Projects_ProjectsId",
                        column: x => x.ProjectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectSkills_Skills_LookingForSkillsId",
                        column: x => x.LookingForSkillsId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTechStacks",
                columns: table => new
                {
                    ProjectsId = table.Column<int>(type: "integer", nullable: false),
                    TechnologyStackId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTechStacks", x => new { x.ProjectsId, x.TechnologyStackId });
                    table.ForeignKey(
                        name: "FK_ProjectTechStacks_Projects_ProjectsId",
                        column: x => x.ProjectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTechStacks_TechStacks_TechnologyStackId",
                        column: x => x.TechnologyStackId,
                        principalTable: "TechStacks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Front-end" },
                    { 2, "Back-end" },
                    { 3, "UX/UI" },
                    { 4, "DevOps" },
                    { 5, "AI/ML" },
                    { 6, "Data Science" },
                    { 7, "Mobile Development" },
                    { 8, "Game Development" },
                    { 9, "Desktop Development" },
                    { 10, "Cloud Computing" },
                    { 11, "Cybersecurity" },
                    { 12, "Database Administration" },
                    { 13, "Networking" },
                    { 14, "Embedded Systems" }
                });

            migrationBuilder.InsertData(
                table: "TechStacks",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "JavaScript" },
                    { 2, "HTML" },
                    { 3, "CSS" },
                    { 4, "React" },
                    { 5, "Angular" },
                    { 6, "Vue.js" },
                    { 7, "Node.js" },
                    { 8, "Python" },
                    { 9, "Django" },
                    { 10, "Flask" },
                    { 11, "Java" },
                    { 12, "Spring Boot" },
                    { 13, "C#" },
                    { 14, ".NET" },
                    { 15, "C++" },
                    { 16, "Rust" },
                    { 17, "Go" },
                    { 18, "Swift" },
                    { 19, "Kotlin" },
                    { 20, "Ruby" },
                    { 21, "Rails" },
                    { 22, "PHP" },
                    { 23, "Laravel" },
                    { 24, "AWS" },
                    { 25, "Azure" },
                    { 26, "Google Cloud" },
                    { 27, "Docker" },
                    { 28, "Kubernetes" },
                    { 29, "TensorFlow" },
                    { 30, "PyTorch" },
                    { 31, "Pandas" },
                    { 32, "NumPy" },
                    { 33, "Scikit-learn" },
                    { 34, "Unity" },
                    { 35, "Unreal Engine" },
                    { 36, "Qt" },
                    { 37, "Electron" },
                    { 38, "Blazor" },
                    { 39, "Xamarin" },
                    { 40, "Flutter" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDevelopers_ProjectsId",
                table: "ProjectDevelopers",
                column: "ProjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OwnerId",
                table: "Projects",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSkills_ProjectsId",
                table: "ProjectSkills",
                column: "ProjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTechStacks_TechnologyStackId",
                table: "ProjectTechStacks",
                column: "TechnologyStackId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_UsersId",
                table: "UserSkills",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTechStacks_UsersId",
                table: "UserTechStacks",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectDevelopers");

            migrationBuilder.DropTable(
                name: "ProjectSkills");

            migrationBuilder.DropTable(
                name: "ProjectTechStacks");

            migrationBuilder.DropTable(
                name: "UserSkills");

            migrationBuilder.DropTable(
                name: "UserTechStacks");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "TechStacks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
