#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use autopilot::geometry::Point;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn move_cursor(offset: f64) -> Result<(), String> {
    let current = autopilot::mouse::location();
    autopilot::mouse::smooth_move(Point::new(current.x + offset, current.y + offset), None)
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![move_cursor])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
