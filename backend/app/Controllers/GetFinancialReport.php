<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class GetFinancialReport extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userModel = new UserModel();

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
            return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $parkingId = $user['parking_id'];

        $db = \Config\Database::connect();

        $totalRevenueQuery = $db->query('
            SELECT
                SUM(cost_in_cents) AS total_revenue
            FROM
                bookings
            WHERE
                parking_id = ?
            AND
                is_finished = ?;
        ', [$parkingId, 1]);

        $monthRevenueQuery = $db->query("
            SELECT
                SUM(cost_in_cents) AS month_revenue
            FROM
                bookings
            WHERE
                parking_id = ?
            AND
                is_finished = ?
            AND
                YEAR(CONVERT_TZ(ended_at, '+00:00', '-03:00')) = YEAR(CONVERT_TZ(NOW(), @@session.time_zone, '-03:00'))
            AND
                MONTH(CONVERT_TZ(ended_at, '+00:00', '-03:00')) = MONTH(CONVERT_TZ(NOW(), @@session.time_zone, '-03:00'));
        ", [$parkingId, 1]);

        $dayRevenueQuery = $db->query("
            SELECT
                SUM(cost_in_cents) AS day_revenue
            FROM
                bookings
            WHERE
                parking_id = ?
            AND
                is_finished = ?
            AND
                DATE(CONVERT_TZ(ended_at, '+00:00', '-03:00')) = DATE(CONVERT_TZ(NOW(), @@session.time_zone, '-03:00'))
        ", [$parkingId, 1]);

        $totalRevenue = $totalRevenueQuery->getRow()->total_revenue;
        $monthRevenue = $monthRevenueQuery->getRow()->month_revenue;
        $dayRevenue = $dayRevenueQuery->getRow()->day_revenue;

        return $this->respond([
            'total_revenue_in_cents' => $totalRevenue,
            'month_revenue_in_cents' => $monthRevenue,
            'day_revenue_in_cents' => $dayRevenue,
        ]);
    }
}
