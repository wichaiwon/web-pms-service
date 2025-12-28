# Web PMS – Vehicle Service Review Service Checklist

---

## Vehicle Service Review

### API
- [✅] Get all record  
  - [✅] Filter by branch  
  - [✅] Filter by today()  
  - [✅] is_active = true  

- [✅] Get record by ID  

- [✅] Create one record  
  - [✅] Auto create detail  
  - [❌] Auto create step-one  
  - [❌] Auto create step-two  
  - [❌] Auto create step-three  
  - [❌] Auto create step-four  

- [✅] Create bulk insert  

- [✅] Auto sync from Appointment (n8n)  

- [✅] Update vehicle service review  

- [✅] Patch is_active  

- [✅] Patch success flag (for Appium)  

- [✅] Re-Issue vehicle service review  
  - [✅] Set old detail is_active = false  
  - [✅] Auto create new detail record  
  - [✅] Keep log history  

- [✅] Cancel vehicle service review  
  - [✅] Set review is_active = false  
  - [✅] Set detail is_active = false  

---

## Vehicle Service Review Detail

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get detail by ReviewId  

- [✅] Create one record (manual – handle bug)  

- [✅] Update vehicle service review detail  

- [✅] Patch is_active  

- [✅] Patch success flag (for Appium)  

---

## Vehicle Service Review Detail Additional

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get step one record by ReviewDetailId  

- [✅] Create one record (manual – handle bug)  

- [❌] Update vehicle service review detail additional  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step One

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step one  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step One Additional

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewDetailId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step one additional  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step Two

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step two  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step Two Additional

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewDetailId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step two additional  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step Three

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step three  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step Three Additional

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewDetailId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step three additional  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Vehicle Service Review – Step Four

> ❌ Get all – Not in this phase (22-01-25)

### API
- [❌] Get record by ReviewId  

- [❌] Create one record (manual – handle bug)  

- [❌] Update vehicle service review step four  

- [❌] Patch is_active  

- [❌] Patch success flag (for Appium)  

---

## Notes
- `success flag` ใช้สำหรับ Appium automation test  
- `is_active` ใช้ควบคุม logical delete / cancel  
- Re-Issue ต้อง **ไม่ลบข้อมูลเดิม** เพื่อเก็บ audit log  
- n8n เป็น source หลักจาก Appointment Service
