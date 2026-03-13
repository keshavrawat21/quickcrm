<?php

namespace App\Http\Controllers\Crm\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Contact;
use App\Models\CrmTask;
use App\Models\CrmTaskStatus;
use App\Models\Lead;
use App\Models\Opportunity;
use App\Models\Quote;
use App\Models\SalaryHistory;
use App\Models\SaleInvoice;
use App\Models\Tasks;
use App\Models\Ticket;
use App\Models\TicketStatus;
use App\Models\Users;
use App\Models\Transaction;
use Exception;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CrmDashboardController extends Controller
{
    public function getDashboardData(Request $request): JsonResponse
    {
        try {

            $startDate = $request->query('startDate');
            $endDate = $request->query('endDate');

            //total user count
            $userQuery = Users::where('status', 'true');
            if ($startDate && $endDate) {
                $userQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $userQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $userQuery->whereDate('created_at', '<=', $endDate);
            }
            $userCount = $userQuery->count();

            $totalUserCount = [
                'count' => $userCount
            ];

            //lead count
            $leadQuery = Lead::where('status', 'true');
            if ($startDate && $endDate) {
                $leadQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $leadQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $leadQuery->whereDate('created_at', '<=', $endDate);
            }
            $leadCount = $leadQuery->count();

            $totalLeadCount = [
                'count' => $leadCount
            ];

            //total saleInvoice
            $saleInvoiceQuery = SaleInvoice::where('status', 'true');
            if ($startDate && $endDate) {
                $saleInvoiceQuery->whereBetween('date', [$startDate, $endDate]);
            } elseif ($startDate) {
                $saleInvoiceQuery->whereDate('date', '>=', $startDate);
            } elseif ($endDate) {
                $saleInvoiceQuery->whereDate('date', '<=', $endDate);
            }
            $saleInvoiceCount = $saleInvoiceQuery->count();

            $totalSaleInvoice = [
                'count' => $saleInvoiceCount
            ];

            //saleInvoice value
            $saleInvoiceValueQuery = SaleInvoice::where('status', 'true');
            if ($startDate && $endDate) {
                $saleInvoiceValueQuery->whereBetween('date', [$startDate, $endDate]);
            } elseif ($startDate) {
                $saleInvoiceValueQuery->whereDate('date', '>=', $startDate);
            } elseif ($endDate) {
                $saleInvoiceValueQuery->whereDate('date', '<=', $endDate);
            }
            $saleInvoiceValue = $saleInvoiceValueQuery->sum('totalAmount');

            //total ticket
            $ticketQuery = Ticket::where('status', 'true');
            if ($startDate && $endDate) {
                $ticketQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $ticketQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $ticketQuery->whereDate('created_at', '<=', $endDate);
            }
            $ticketCount = $ticketQuery->count();

            $totalTicket = [
                'count' => $ticketCount
            ];

            $userSalaryQuery = SalaryHistory::orderBy('id', 'desc');
            if ($startDate && $endDate) {
                $userSalaryQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $userSalaryQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $userSalaryQuery->whereDate('created_at', '<=', $endDate);
            }
            $userSalary = $userSalaryQuery->get();
            $salary = 0;
            foreach ($userSalary as $key => $value) {
                $salary += $value->salary;
            }

            $totalSalary = [
                'value' => $salary
            ];

            //total opportunity and value
            $opportunityCountQuery = Opportunity::where('status', 'true');
            if ($startDate && $endDate) {
                $opportunityCountQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $opportunityCountQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $opportunityCountQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalOpportunityCount = $opportunityCountQuery->count();

            $opportunityValueQuery = Opportunity::where('status', 'true');
            if ($startDate && $endDate) {
                $opportunityValueQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $opportunityValueQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $opportunityValueQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalOpportunityValue = $opportunityValueQuery->sum('amount');

            $opportunity = [
                'count' => $totalOpportunityCount,
                'value' => $totalOpportunityValue
            ];

            //total quote and value
            $quoteCountQuery = Quote::where('status', 'true');
            if ($startDate && $endDate) {
                $quoteCountQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $quoteCountQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $quoteCountQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalQuoteCount = $quoteCountQuery->count();

            $quoteValueQuery = Quote::where('status', 'true');
            if ($startDate && $endDate) {
                $quoteValueQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $quoteValueQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $quoteValueQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalQuoteValue = $quoteValueQuery->sum('totalAmount');

            $quote = [
                'count' => $totalQuoteCount,
                'value' => $totalQuoteValue
            ];

            //total contact count
            $contactQuery = Contact::where('status', 'true');
            if ($startDate && $endDate) {
                $contactQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $contactQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $contactQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalContactCount = $contactQuery->count();
            $contact = [
                'count' => $totalContactCount,
            ];

            //total company
            $companyQuery = Company::where('status', 'true');
            if ($startDate && $endDate) {
                $companyQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($startDate) {
                $companyQuery->whereDate('created_at', '>=', $startDate);
            } elseif ($endDate) {
                $companyQuery->whereDate('created_at', '<=', $endDate);
            }
            $totalCompanyCount = $companyQuery->count();
            $company = [
                'count' => $totalCompanyCount,
            ];

            //total crmTask by status
            $totalCrmTask = CrmTaskStatus::all();

            $crmTask = [];
            foreach ($totalCrmTask as $key => $value) {
                $taskQuery = Tasks::where('status', $value->id);
                if ($startDate && $endDate) {
                    $taskQuery->whereBetween('created_at', [$startDate, $endDate]);
                } elseif ($startDate) {
                    $taskQuery->whereDate('created_at', '>=', $startDate);
                } elseif ($endDate) {
                    $taskQuery->whereDate('created_at', '<=', $endDate);
                }
                $crmTask[$key]['statusName'] = $value->taskStatusName;
                $crmTask[$key]['statusCount'] = $taskQuery->count();
            }

            //lead data by status for chart
            $leadStatuses = ['new', 'contacted', 'qualified', 'lost', 'cancelled', 'working', 'customer'];
            $leadByStatus = [];

            foreach ($leadStatuses as $status) {
                $leadStatusQuery = Lead::where('status', 'true')
                    ->where('leadStatus', $status);
                if ($startDate && $endDate) {
                    $leadStatusQuery->whereBetween('created_at', [$startDate, $endDate]);
                } elseif ($startDate) {
                    $leadStatusQuery->whereDate('created_at', '>=', $startDate);
                } elseif ($endDate) {
                    $leadStatusQuery->whereDate('created_at', '<=', $endDate);
                }
                $count = $leadStatusQuery->count();

                $leadByStatus[] = [
                    'statusName' => ucfirst($status),
                    'statusCount' => $count
                ];
            }

            // ticket data by status for chart
            $allTicketStatus = TicketStatus::all();
            $ticketByStatus = [];

            foreach ($allTicketStatus as $status) {
                $ticketStatusQuery = Ticket::where('status', 'true')
                    ->where('ticketStatusId', $status->id);
                if ($startDate && $endDate) {
                    $ticketStatusQuery->whereBetween('created_at', [$startDate, $endDate]);
                } elseif ($startDate) {
                    $ticketStatusQuery->whereDate('created_at', '>=', $startDate);
                } elseif ($endDate) {
                    $ticketStatusQuery->whereDate('created_at', '<=', $endDate);
                }
                $count = $ticketStatusQuery->count();

                $ticketByStatus[] = [
                    'statusName' => $status->ticketStatusName,
                    'statusCount' => $count
                ];
            }

            // Get sales data grouped by month with date filtering
            $salesQuery = SaleInvoice::where('status', 'true')
                ->selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(totalAmount) as total_amount')
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc');
            if ($startDate && $endDate) {
                $salesQuery->whereBetween('date', [$startDate, $endDate]);
            } elseif ($startDate) {
                $salesQuery->whereDate('date', '>=', $startDate);
            } elseif ($endDate) {
                $salesQuery->whereDate('date', '<=', $endDate);
            }
            $salesData = $salesQuery->get();

            // Format the sales by month data
            $salesByMonth = [];
            foreach ($salesData as $sale) {
                $monthName = Carbon::createFromDate($sale->year, $sale->month, 1)->format('M');
                $salesByMonth[] = [
                    'month' => $monthName,
                    'year' => $sale->year,
                    'amount' => (float) $sale->total_amount,
                    'formattedAmount' => '$' . number_format($sale->total_amount, 2)
                ];
            }

            // Get transaction data grouped by month with date filtering
            $transactionQuery = Transaction::where('status', 'true')
                ->selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(amount) as total_amount')
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc');
            if ($startDate && $endDate) {
                $transactionQuery->whereBetween('date', [$startDate, $endDate]);
            } elseif ($startDate) {
                $transactionQuery->whereDate('date', '>=', $startDate);
            } elseif ($endDate) {
                $transactionQuery->whereDate('date', '<=', $endDate);
            }
            $transactionData = $transactionQuery->get();

            // Format the transaction by month data
            $transactionsByMonth = [];
            foreach ($transactionData as $transaction) {
                $monthName = Carbon::createFromDate($transaction->year, $transaction->month, 1)->format('M');
                $transactionsByMonth[] = [
                    'month' => $monthName,
                    'year' => $transaction->year,
                    'amount' => (float) $transaction->total_amount,
                    'formattedAmount' => '$' . number_format($transaction->total_amount, 2)
                ];
            }

            $data = [
                'totalUsers' => $totalUserCount,
                'totalSalary' => $totalSalary,
                'opportunity' => $opportunity,
                'quote' => $quote,
                'contact' => $contact,
                'company' => $company,
                'task' => $crmTask,
                'lead' => $totalLeadCount,
                'leadByStatus' => $leadByStatus,
                'saleInvoice' => $totalSaleInvoice,
                'ticket' => $totalTicket,
                'ticketByStatus' => $ticketByStatus,
                'saleInvoiceValue' => $saleInvoiceValue,
                'salesByMonth' => $salesByMonth,
                'transactionsByMonth' => $transactionsByMonth
            ];

            return response()->json($data, 200);
        } catch (Exception $err) {
            return $this->badRequest($err->getMessage());
        }
    }
}
