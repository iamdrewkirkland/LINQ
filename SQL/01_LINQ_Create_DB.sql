USE [master]

IF db_id('Linq') IS NULl
  CREATE DATABASE [Linq]
GO

USE [Linq]
GO


DROP TABLE IF EXISTS [UserApprovedList];
DROP TABLE IF EXISTS [Links];
DROP TABLE IF EXISTS [Categories];
DROP TABLE IF EXISTS [UserProfile];
GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Username] nvarchar(28) NOT NULL,
  [Email] nvarchar(55) NOT NULL,
  [CreateDate] datetime NOT NULL,
  [FirebaseUserId] nvarchar(55) NOT NULL
)
GO

CREATE TABLE [Categories] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(55) NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Color] nvarchar(7),
  [IsPublic] bit DEFAULT 0 NOT NULL,
  [IsFavorite] bit DEFAULT 0 NOT NULL

CONSTRAINT [FK_Categories_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
)
GO

CREATE TABLE [Links] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(55) NOT NULL,
  [Url] nvarchar(max) NOT NULL,
  [CreateDate] datetime NOT NULL,
  [UserProfileId] integer NOT NULL,
  [CategoryId] integer,
  [IsFavorite] bit DEFAULT 0 NOT NULL,
  
  CONSTRAINT [FK_Links_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Links_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id])
)
GO

CREATE TABLE [UserApprovedList] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CategoryId] integer NOT NULL,
  [SharedUserId] integer NOT NULL

  CONSTRAINT [FK_UserApprovedList_UserProfile] FOREIGN KEY ([SharedUserId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_UserApprovedList_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id])
)
GO
