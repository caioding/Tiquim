# Tiquim Project

## Overview

Tiquim is a crowdfunding platform that enables users to launch campaigns for raising funds for various projects or causes. This platform was created as part of the Web Academy UFAM training program, a collaboration between the Federal University of Amazonas (UFAM), the Institute of Computing (ICOMP), and Motorola.

## Technologies

- React JS
- Prisma ORM
- MySQL
- Docker
- TypeScript

## Prerequisites

- make
- docker
- docker compose plugin

## Setup Instructions

### Step 1: Copy the .env files

```bash
make copy
```

### Step 2: Install project dependencies

```bash
make install
```

### Step 3: Start the application in Docker

```bash
make up
```

### Step 4: Seed the database with initial ID types

```bash
make seed
```