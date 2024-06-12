﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Database;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240612105741_invitation_type")]
    partial class invitation_type
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ProjectSkill", b =>
                {
                    b.Property<int>("LookingForSkillsId")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectsId")
                        .HasColumnType("integer");

                    b.HasKey("LookingForSkillsId", "ProjectsId");

                    b.HasIndex("ProjectsId");

                    b.ToTable("ProjectSkills", (string)null);
                });

            modelBuilder.Entity("ProjectTechStack", b =>
                {
                    b.Property<int>("ProjectsId")
                        .HasColumnType("integer");

                    b.Property<int>("TechnologyStackId")
                        .HasColumnType("integer");

                    b.HasKey("ProjectsId", "TechnologyStackId");

                    b.HasIndex("TechnologyStackId");

                    b.ToTable("ProjectTechStacks", (string)null);
                });

            modelBuilder.Entity("ProjectUser", b =>
                {
                    b.Property<int>("DevelopersId")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectsId")
                        .HasColumnType("integer");

                    b.HasKey("DevelopersId", "ProjectsId");

                    b.HasIndex("ProjectsId");

                    b.ToTable("ProjectDevelopers", (string)null);
                });

            modelBuilder.Entity("SkillUser", b =>
                {
                    b.Property<int>("SkillsId")
                        .HasColumnType("integer");

                    b.Property<int>("UsersId")
                        .HasColumnType("integer");

                    b.HasKey("SkillsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("UserSkills", (string)null);
                });

            modelBuilder.Entity("TechStackUser", b =>
                {
                    b.Property<int>("TechStacksId")
                        .HasColumnType("integer");

                    b.Property<int>("UsersId")
                        .HasColumnType("integer");

                    b.HasKey("TechStacksId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("UserTechStacks", (string)null);
                });

            modelBuilder.Entity("backend.Models.Invitation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("AcceptedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("boolean");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ProjectId")
                        .HasColumnType("integer");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("integer");

                    b.Property<int>("SenderId")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("Invitations");
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("GithubLink")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("backend.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Skills");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Front-end"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Back-end"
                        },
                        new
                        {
                            Id = 3,
                            Name = "UX/UI"
                        },
                        new
                        {
                            Id = 4,
                            Name = "DevOps"
                        },
                        new
                        {
                            Id = 5,
                            Name = "AI/ML"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Data Science"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Mobile Development"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Game Development"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Desktop Development"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Cloud Computing"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Cybersecurity"
                        },
                        new
                        {
                            Id = 12,
                            Name = "Database Administration"
                        },
                        new
                        {
                            Id = 13,
                            Name = "Networking"
                        },
                        new
                        {
                            Id = 14,
                            Name = "Embedded Systems"
                        });
                });

            modelBuilder.Entity("backend.Models.TechStack", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TechStacks");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "JavaScript"
                        },
                        new
                        {
                            Id = 2,
                            Name = "HTML"
                        },
                        new
                        {
                            Id = 3,
                            Name = "CSS"
                        },
                        new
                        {
                            Id = 4,
                            Name = "React"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Angular"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Vue.js"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Node.js"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Python"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Django"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Flask"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Java"
                        },
                        new
                        {
                            Id = 12,
                            Name = "Spring Boot"
                        },
                        new
                        {
                            Id = 13,
                            Name = "C#"
                        },
                        new
                        {
                            Id = 14,
                            Name = ".NET"
                        },
                        new
                        {
                            Id = 15,
                            Name = "C++"
                        },
                        new
                        {
                            Id = 16,
                            Name = "Rust"
                        },
                        new
                        {
                            Id = 17,
                            Name = "Go"
                        },
                        new
                        {
                            Id = 18,
                            Name = "Swift"
                        },
                        new
                        {
                            Id = 19,
                            Name = "Kotlin"
                        },
                        new
                        {
                            Id = 20,
                            Name = "Ruby"
                        },
                        new
                        {
                            Id = 21,
                            Name = "Rails"
                        },
                        new
                        {
                            Id = 22,
                            Name = "PHP"
                        },
                        new
                        {
                            Id = 23,
                            Name = "Laravel"
                        },
                        new
                        {
                            Id = 24,
                            Name = "AWS"
                        },
                        new
                        {
                            Id = 25,
                            Name = "Azure"
                        },
                        new
                        {
                            Id = 26,
                            Name = "Google Cloud"
                        },
                        new
                        {
                            Id = 27,
                            Name = "Docker"
                        },
                        new
                        {
                            Id = 28,
                            Name = "Kubernetes"
                        },
                        new
                        {
                            Id = 29,
                            Name = "TensorFlow"
                        },
                        new
                        {
                            Id = 30,
                            Name = "PyTorch"
                        },
                        new
                        {
                            Id = 31,
                            Name = "Pandas"
                        },
                        new
                        {
                            Id = 32,
                            Name = "NumPy"
                        },
                        new
                        {
                            Id = 33,
                            Name = "Scikit-learn"
                        },
                        new
                        {
                            Id = 34,
                            Name = "Unity"
                        },
                        new
                        {
                            Id = 35,
                            Name = "Unreal Engine"
                        },
                        new
                        {
                            Id = 36,
                            Name = "Qt"
                        },
                        new
                        {
                            Id = 37,
                            Name = "Electron"
                        },
                        new
                        {
                            Id = 38,
                            Name = "Blazor"
                        },
                        new
                        {
                            Id = 39,
                            Name = "Xamarin"
                        },
                        new
                        {
                            Id = 40,
                            Name = "Flutter"
                        });
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ProjectSkill", b =>
                {
                    b.HasOne("backend.Models.Skill", null)
                        .WithMany()
                        .HasForeignKey("LookingForSkillsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProjectTechStack", b =>
                {
                    b.HasOne("backend.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.TechStack", null)
                        .WithMany()
                        .HasForeignKey("TechnologyStackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProjectUser", b =>
                {
                    b.HasOne("backend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("DevelopersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SkillUser", b =>
                {
                    b.HasOne("backend.Models.Skill", null)
                        .WithMany()
                        .HasForeignKey("SkillsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TechStackUser", b =>
                {
                    b.HasOne("backend.Models.TechStack", null)
                        .WithMany()
                        .HasForeignKey("TechStacksId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Invitation", b =>
                {
                    b.HasOne("backend.Models.Project", "Project")
                        .WithMany("Invitations")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "Receiver")
                        .WithMany("ReceivedInvitations")
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "Sender")
                        .WithMany("SentInvitations")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.HasOne("backend.Models.User", "Owner")
                        .WithMany("OwnedProjects")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.Navigation("Invitations");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("OwnedProjects");

                    b.Navigation("ReceivedInvitations");

                    b.Navigation("SentInvitations");
                });
#pragma warning restore 612, 618
        }
    }
}
