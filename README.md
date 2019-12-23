![alt text](https://seniorproject.sit.kmutt.ac.th/projectPoster/posterIT59-BU37.jpg)

## Cloud Native Microservices: Event Management Platform (Elasticsearch Stack & Spring Cloud) 

MeetU: Platform Event Management  ที่เข้ามามีส่วนช่วยเหล่าวัยรุ่นไฟแรงที่มีพลังสร้างสรรค์เป็นช่วงเวลาแห่งการทำกิจกรรมได้มาสร้างกิจกรรมและทำกิจกรรมดีๆร่วมกัน โดย MeetU มีจุดเด่นในเรื่องของการค้นหากิจกรรมตามที่พวกคุณชื่นชอบได้ด้วยระบบแนะนำกิจกรรม หรือจะเป็นการไปค้นพบกิจกรรมแนวใหม่ยอดนิยมที่ทำให้คุณได้หลุดออกมาจาก comfort zone เรียนรู้กิจกรรมใหม่ๆก็ได้ และสิ่งที่มาช่วยเป็นตัวขับเคลื่อนให้กิจกรรมสนุกขึ้นนั้นก็คือระบบ Leader Board ที่สามารถให้คุณแสดงคะแนนกิจกรรมจากกิจกรรมที่คุณเคยไปเข้าร่วมได้ พร้อมกับพบปะผู้คนที่มีความสนใจเหมือนกัน ! สำหรับในด้าน Technology เอง MeetU มาพร้อมกับสถาปัตยกรรม Application แบบ Microservices ซึ่งมามีส่วนช่วยในการออกแบบอย่าง Module ในอนาคตนั้นสามารถทำได้ง่ายได้ ซึ่งสำหรับ Core Feature ที่เราเลือก Technology มาใช้นั่นก็คือ Elasticsearch Stack ที่ทำหน้าที่ทั้งในส่วนร่วมกับ Backend คือระบบการค้นหาแบบ Full Text Search ช่วยให้เราค้นหากิจกรรมต่างๆได้ง่ายขึ้น และการ Monitoring Infeastructure ของระบบ Microservices และสำหรับภาษาที่เลิอกใช้ก็คือ Java Spring boot ที่เป็น Framework การพัฒนา Backend ซึ่งมาควบคู่กับหลัก 12 Factors อันนำไปสู่การเป็น Cloud Native Application ให้สามารถ Scaling ได้ในรูปแบบ Horizontal รวมไปถึงการรองรับ Fault Torelant ได้ในระดับนึงเพราะ Application เราถูกแบ่งออกเป็น Services หลักๆ ต่อให้มี Services ใดเกิดการล่มลงไป Application ก็ยังคงมีบาง Service ที่รองรับและทำงานได้ต่อไป

## วิธีการติดตั้ง project
Import MongoDB Database
1. Restore ข้อมูลกลับเข้า MongoDB
ทำการ import ไฟล์จาก meetu-mongodb-dump ด้วยการใช้คำสั่ง mongorestore https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/ เพื่อนำข้อมูลที่ถูก dump ออกมาเป้น bson กลับเข้าไปใน mongodb

2. Migrate ข้อมูลจาก MongoDB ไปยัง Elasticsearch
ต้องใช้ Monstache ซึ่งเป็น Golang Library ในการ Import ข้อมูลจาก MongoDB ให้เข้าไปใน Elasticsearch ซึ่งผู้ใช้ไม่จำเป็นต้องลง Golang ที่เครื่องก็ได้เพราะว่า Monstache ได้ compile ออกมาเป็น execute file สำหรับ OS ทั้งสาม Platform คือ Darwin, Window และ Linux เรียบร้อยแล้ว 
![alt text]( https://i.ibb.co/7VH6q8d/image.png)
https://rwynn.github.io/monstache-site/start/ เมื่อเข้าไปที่เว็บของ Monstache แล้วให้เราโหลด execute binary มาจาก github ผ่าน https://github.com/rwynn/monstache/releases หรือจะใช้ execute bin ที่เป็นของ window จาก MeetU Repository นี้ก็ได้โดยเข้าไปที่ folder monstache-golang-window และใช้คำสั่ง  monstache.exe -f .\mongo-elastic.toml  เพื่อเป็นการสั่งให้ทำการ execute monstache bin และใช้ไฟล์ config ตาม path ที่ระบุ
![alt text](https://i.ibb.co/TwT1jZX/image.png)
สำหรับตัวอย่างไฟล์ config จะมีดังนี้โดยให้ปรับ url ของ MongoDB และ Elasticsearch เป็นของที่เราใช้ 

3. Backup Index บน Elasticsearch และเปลี่ยนเป็นชื่อใหม่เพื่อใช้การ Remapping Index
จากข้อ 2. Migrate ข้อมูลจาก MongoDB ไปยัง Elasticsearch ที่เราสามารถนำข้อมูลกลับเข้าไปใน Elasticsearch แล้วก้จริงแต่ว่าข้อมูลที่ Migrate จาก MongoDB เข้าไปใน Elasticsearch นั้นจะมี format หลายจุดที่ผิดเพราะบาง fields เก็บข้อมูลไม่ถูกต้องนั่นก็คือ fields geopoint รวมไปถึง fields elasticEventId ซึ่งเป็น key ที่ใช้ในการ reference ข้อมูลระหว่าง MongoDB กับ Elasticsearch ก็ขาดไปดังนั้นเราจึงต้องทำการ Remapping Index บน Elasticsearch ให้เพิ่ม fields เหล่านั้นและเพิ่ม  Analyzer ของ Elasticsearch เข้าไปเพราะถ้าเราไม่ทำ Analyzer ประจำ fields แล้วคุณสมบัติของการทำ Full Text Search ก็จะไม่สามารถทำได้อย่างเต็มประสิทธิภาพ
![alt text](https://i.ibb.co/kgSgZ5j/image.png)
แต่ Elasticsearch นั้นไม่สามารถ Remapping fields ที่เคยสร้างไปแล้วดังนั้นจึงมีความจำเป็นที่ copy ข้อมูลจาก Index เดิมไปที่ Index ใหม่และเก็บเป็น index ชั่วคราวไว้ก่อนดั่งภาพ  

4.สร้าง Analyzer และ Mapping Type สำหรับ Elasticsearch index 
หลังจากที่ทำมีข้อมูลที่ Sync จาก MongoDB เข้าไปใน Elasticsearch เรียบร้อยแล้วเราจะพบว่ามีบาง fields เก็บข้อมูลไม่ถูกต้องนั่นก็คือ fields geopoint 
และเราก็ยังขาด Analyzer ของ Elasticsearch เพราะถ้าเราไม่ทำ Analyzer ประจำ fields แล้วคุณสมบัติของการทำ Full Text Search ก็จะไม่สามารถถูกใช้งานได้อย่างมีประสิทธิภาพ

5.

![alt text](https://i.ibb.co/MMhN16p/image.png)

 ดังนั้นให้เราทำการเข้าไปที่ folder Elasticsearch และเปิดไฟล์ EventIndex(Real Usage).es ขึ้นมาด้วยโปรแกรม text editor  ใดๆก็ตามจากนั้นนำ request ข้อ 1) ซึ่งใช้ในการสร้าง Analyzer ที่ index meetu.events ไปใช้งานบน Kibana ดั่งภาพและเมื่อสำเร็จดั่งภาพแล้วให้ทำการนำ request ข้อ 2) คือการสร้าง mapping บน index meetu.events ให้นำ Analyzer  ที่สร้างไปก่อนหน้ามาใช้งานบน fields eventName, eventDetail ทำให้เราสามารถทำ Full Text Search ได้นั่นเอง
 
![alt text](https://i.ibb.co/GHYmQ3M/image.png)



## Tools & Services

![alt text](https://seniorproject.sit.kmutt.ac.th/screenshot/screenshot10.IT59-BU37.jpg)

Backend:
- Microservices Design (Almost 12 Factors)
- Java Spring Boot (Java 11 and Container Tuning)
- Spring Cloud (Microservices Framework)

Frontend:
- Nuxt.JS (Vue.js) Server Side Rendering
- Progressive Web Application
- Node.js

Database:
- MongoDB 4.2 (1 Service 1 Database in Conceptual for Microservices)
- Elasticsearch 7.2 (Recommendation & Searching)

Infrastructure
(ElasticStack: On Premise with Docker)
- Elasticsearch (Fulltext-search &Logs)
- Logstash (Migrate Data)
- Kibana (Realtime-Visualization)
- Application Performance Monitoring (APM)
- Metricbeats (Hardware & Network Monitoring)

(Microservice - Spring Cloud)
- Zuul API Gateway (Application Loadbalancer)
- Eureka Server (Service Discovery & Register)
- Config Server (Credential Management)

(Server: AWS)
- Route53 (DNS Load Balancer)
- EC2 (VM Instance)
- CentOS 7
- Docker (Container Everything Includes Elastic)

Services:
- Monstache (Golang Driver for Migrate Data from MongoDB to Elasticsearch)
- Firebase Cloud Storage
- Firebase Authenication (OAuth)
- Firebase Cloud Messaging (PWA push notication)
- Google Map

Misc:
- Postman
- Adobe XD
- Git

## Elasticstack 
![alt text](https://seniorproject.sit.kmutt.ac.th/screenshot/screenshot10.IT59-BU37.png)
