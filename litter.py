from ultralytics import YOLO
import cv2
import time
import math

model = YOLO("yolov8n.pt")
cap = cv2.VideoCapture(0)

garbage_classes = ["bottle", "cup", "banana", "apple"]
person_class = "person"

garbage_timer = None
garbage_position = None
person_position = None

DISTANCE_THRESHOLD = 150

# --- NEW ---
detection_history = []
HISTORY_SIZE = 10
MISS_TOLERANCE = 3
miss_count = 0

def get_center(box):
    x1, y1, x2, y2 = box.xyxy[0]
    return int((x1 + x2) / 2), int((y1 + y2) / 2)

def distance(p1, p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)

    garbage_detected = False
    current_garbage_pos = None
    current_person_pos = None

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            conf = float(box.conf[0])

            # Ignore low confidence
            if conf < 0.5:
                continue

            center = get_center(box)

            if label in garbage_classes:
                garbage_detected = True
                current_garbage_pos = center

            if label == person_class:
                current_person_pos = center

    # --- STABILITY LAYER ---
    detection_history.append(garbage_detected)

    if len(detection_history) > HISTORY_SIZE:
        detection_history.pop(0)

    stable_detection = detection_history.count(True) > (HISTORY_SIZE // 2)

    # Handle missing frames
    if not garbage_detected:
        miss_count += 1
    else:
        miss_count = 0

    if miss_count > MISS_TOLERANCE:
        garbage_timer = None
        garbage_position = None

    # --- MAIN LOGIC ---
    if stable_detection:
        if garbage_timer is None:
            garbage_timer = time.time()
            garbage_position = current_garbage_pos

        elif time.time() - garbage_timer > 3 and garbage_position and current_person_pos:

            dist = distance(garbage_position, current_person_pos)

            if dist > DISTANCE_THRESHOLD:
                cv2.putText(frame, "⚠️ Littering Detected!", (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

                print("Littering confirmed")

    # Show output
    annotated_frame = results[0].plot()
    cv2.imshow("Garbage Detection System", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()