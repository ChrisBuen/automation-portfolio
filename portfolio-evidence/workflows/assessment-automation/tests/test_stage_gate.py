import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "src"))
import stage_gate


class StageGateTests(unittest.TestCase):
    def test_missing_ownership_blocks_research(self):
        result = stage_gate.readiness(["ownership"])
        self.assertEqual(result["status"], "evidence_gap")
        self.assertTrue(result["humanReviewRequired"])

    def test_automation_cannot_approve(self):
        with self.assertRaisesRegex(PermissionError, "human reviewer"):
            stage_gate.transition("ready_for_human_review", "approved", "automation")

    def test_human_reviewer_can_approve(self):
        self.assertEqual(
            stage_gate.transition("ready_for_human_review", "approved", "human_reviewer"),
            "approved",
        )


if __name__ == "__main__":
    unittest.main()
