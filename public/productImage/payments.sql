/*
 Navicat Premium Data Transfer

 Source Server         : docker_postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 140001
 Source Host           : localhost:5432
 Source Catalog        : bootcamp_indo_comp_store
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140001
 File Encoding         : 65001

 Date: 26/12/2022 10:49:44
*/


-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS "public"."payments";
CREATE TABLE "public"."payments" (
  "id" int4 NOT NULL DEFAULT nextval('payments_id_seq'::regclass),
  "quantity" int4,
  "total" int4,
  "paymentMethod" varchar(255) COLLATE "pg_catalog"."default",
  "customerId" int4,
  "productId" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."payments" OWNER TO "postgres";

-- ----------------------------
-- Records of payments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Primary Key structure for table payments
-- ----------------------------
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");
