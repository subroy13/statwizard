accountstatus (trial) --> businessinfo


-- SYNC Specific Table
CREATE TABLE dbo.{cloud}_syncentities (
    entityid bigint primary key,
    resourceid varchar,         -- cloud given id
    entitytype varchar,         -- domain / user / orgunit / account 
    entityname varchar,     -- domainname, accountname, user emailid
    parententityid bigint null,      -- maps to same table (if null => root)
    cloudstatus smallint,           -- status of entity in the cloud
    protectedstatus smallint,       -- Do we have files for this entity
    scheduledstatus smallint,       -- is this entity backup needs to run tomorrow
    autobackupstatus smallint,      -- whether we child backup status will be active
);

-- Services table
CREATE TABLE dbo.{cloud}_services_tbl (
    serviceid bigint primary key,      
    entityid bigint foreign key dbo.{cloud}_syncentities,
    soid smallint,      -- app id (Drive = 2)
    jobid bigint foreign key,
    lastpopulatedat timestamp,      -- archiverequestdetails
    lastbackupat timestamp,         -- UB will update this
    "status" smallint,                -- In Process, Queued, Completed
    diskused bigint,
    archivecount bigint,
    totalcount bigint,
    etcdetails json,
    startsnapshot bigint,
);

CREATE TABLE dbo.mvw_agg_{cloud}_services_tbl -- same schema as dbo.{cloud}_services_tbl, but contain all level of agg data


-- ARCHIVE TABLE
CREATE TABLE dbo.{cloud}_{nodename}_tbl (
    node_id uuid primary key,
    ref_id varchar not null,        -- cloud given id
    entityid bigint foreign key dbo.{cloud}_syncentities
    ... -- other columns
);

create table dbo.{cloud}_service_events_tbl (
    eventid bigint primary key,
    entityid bigint foreign key dbo.{cloud}_syncentities, --- (if sync related event, soid = 0 or null)
    soid smallint,      -- app id (Drive = 2)
    logdetails varchar,
    ...
)

-- CHECK
create table dbo.{cloud}_service_violations_tbl (
    eventid bigint primary key,
    entityid bigint foreign key dbo.{cloud}_syncentities, --- (if sync related event, soid = 0 or null)
    soid smallint,      -- app id (Drive = 2)
    logdetails varchar,
    ...
)

-- Cloud LICENSING (API related)



